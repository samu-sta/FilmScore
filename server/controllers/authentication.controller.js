import { validateLogin, validateRegister } from "../schemas/users.js";
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { TIME_EXPIRATION, COOKIE_NAME, ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants/constants.js";
dotenv.config()
import { ContentDAO } from "../dao/ContentDAO.js";
import { UserDAO } from "../dao/UserDAO.js";
import { ReviewDAO } from "../dao/ReviewDAO.js";
import { createDiffieHellmanGroup } from "crypto";
import { log } from "console";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const moviesPath = path.join(__dirname, '../data/movies.json');



async function getMovies(req, res) {
  try {
    const movies = await ContentDAO.getAllContent();
    return res.status(200).json(movies);
  } catch (error) {
    console.error('Error reading movies.json:', error);
    return res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function login(req, res) {
  const result = validateLogin(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const user = await UserDAO.getUserByEmail(req.body.email)
  if (!user) {
    return res.status(400).json({ error: ERROR_MESSAGES.USER_NOT_FOUND })
  }

  const validPassword = await bcryptjs.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_PASSWORD })
  }

  const token = jsonwebtoken.sign({ email: user.email }, process.env.JWT_SECRET
    , { expiresIn: TIME_EXPIRATION.ACCESS_TOKEN }
  )
  const cookieOptions = {
    expires: new Date(Date.now() + TIME_EXPIRATION.COOKIE_EXPIRATION),
    path: '/', 
  };

  res.cookie(COOKIE_NAME, token, cookieOptions)
  return res.status(200).send({status: SUCCESS_MESSAGES.LOGIN_SUCCESS})
}

async function register(req, res) {

  const result = validateRegister(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const userRegistered = await UserDAO.getUserByEmail(req.body.email)
  if (userRegistered) {
    return res.status(400).json({ error: ERROR_MESSAGES.USER_ALREADY_REGISTERED })
  }

  const salt = await bcryptjs.genSalt(5);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);
  const user = {
    ...req.body,
    password: hashedPassword
  }
  await UserDAO.createUser(user)
  return res.status(201).send({status: SUCCESS_MESSAGES.USER_CREATED})
}

async function getProfileDetails(req, res) {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ error:  ERROR_MESSAGES.UNAUTHORIZED})
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    const user = await UserDAO.getUserByEmail(decoded.email)
    if (!user) {
      return res.status(400).json({ error: ERROR_MESSAGES.USER_NOT_FOUND })
    }

    const { password, email, ...userDetails } = user;
    return res.status(200).send(userDetails)
  } catch (error) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_TOKEN })
  }
}

async function putProfileDetails(req, res) {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ error: ERROR_MESSAGES.UNAUTHORIZED })
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    const user = await UserDAO.getUserByEmail(decoded.email)
    console.log(user)
    if (!user) {
      return res.status(400).json({ error: ERROR_MESSAGES.USER_NOT_FOUND })
    }

    const { password, ...userDetails } = user;
    const updatedUser = {
      ...userDetails,
      ...req.body
    }
    console.log(updatedUser)
    await UserDAO.updateUser(updatedUser)
    return res.status(200).send(userDetails)
  } catch (error) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_TOKEN })
  }
}

async function changePassword (req, res) {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ error: ERROR_MESSAGES.UNAUTHORIZED })
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    const user = await UserDAO.getUserByEmail(decoded.email)
    if (!user) {
      return res.status(400).json({ error: ERROR_MESSAGES.USER_NOT_FOUND })
    }

    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    await UserDAO.updatePassword({ email: user.email, password: hashedPassword })
    return res.status(200).send({status: SUCCESS_MESSAGES.PASSWORD_CHANGED})
  } catch (error) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_TOKEN })
  }
}

async function deleteProfile(req, res) {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ error: ERROR_MESSAGES.UNAUTHORIZED })
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    const user = await UserDAO.getUserByEmail(decoded.email)
    if (!user) {
      return res.status(400).json({ error: ERROR_MESSAGES.USER_NOT_FOUND })
    }

    await UserDAO.deleteUser(user.email)
    return res.status(200).send({status: SUCCESS_MESSAGES.USER_DELETED})
  } catch (error) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_TOKEN })
  }
}

async function getContentReviews(req, res) {
  const { movieId } = req.params;
  const reviews = await ReviewDAO.getReviewsByContentId(movieId);
  return res.status(200).json(reviews);
}

async function postContentReview(req, res) {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ error: ERROR_MESSAGES.UNAUTHORIZED })
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    const user = await UserDAO.getUserByEmail(decoded.email)
    if (!user) {
      return res.status(400).json({ error: ERROR_MESSAGES.USER_NOT_FOUND })
    }

    const { rate, content, author, contentFk } = req.body;
    const review = {
      rate,
      content,
      author,
      userFk: user.email,
      contentFk
    }
    await ReviewDAO.createReview(review)
    return res.status(201).send({status: SUCCESS_MESSAGES.REVIEW_CREATED})
    
  } catch (error) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_TOKEN })
  }
}

async function removeContentReview(req, res) {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ error: ERROR_MESSAGES.UNAUTHORIZED })
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    const user = await UserDAO.getUserByEmail(decoded.email)
    if (!user) {
      return res.status(400).json({ error: ERROR_MESSAGES.USER_NOT_FOUND })
    }

    
    const { reviewId } = req.params;
    console.log(req.params)
    const review = await ReviewDAO.getReviewById(reviewId);
    if (!review) {
      return res.status(400).json({ error: ERROR_MESSAGES.REVIEW_NOT_FOUND })
    }
    console.log(review)

    if (review.userFk !== user.email) {
      return res.status(403).json({ error: ERROR_MESSAGES.FORBIDDEN })
    }

    await ReviewDAO.deleteReview(reviewId)
    return res.status(200).send({ status: SUCCESS_MESSAGES.REVIEW_DELETED })
    } catch (error) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_TOKEN })
    }
  }
  
  

async function getEmail(req, res) {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ error: ERROR_MESSAGES.UNAUTHORIZED })
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    return res.status(200).send({ email: decoded.email })
  } catch (error) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_TOKEN })
  }
}

export const methods = {
  login,
  register,
  getMovies,
  getProfileDetails,
  putProfileDetails,
  changePassword,
  deleteProfile,
  getContentReviews,
  postContentReview,
  removeContentReview,
  getEmail
}