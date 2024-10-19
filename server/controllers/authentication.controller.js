import { validateLogin, validateRegister } from "../schemas/users.js";
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TIME_EXPIRATION, COOKIE_NAME, ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants/constants.js";
dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const moviesPath = path.join(__dirname, '../data/movies.json');



async function getMovies(req, res) {
  try {
    const data = await fs.readFile(moviesPath, 'utf-8');
    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading movies.json:', error);
    return res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

const users = []
async function login(req, res) {
  const result = validateLogin(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const user = users.find(user => user.email === req.body.email)
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

  const userRegistered = users.find(user => user.email === req.body.email)
  if (userRegistered) {
    return res.status(400).json({ error: ERROR_MESSAGES.USER_ALREADY_REGISTERED })
  }

  const salt = await bcryptjs.genSalt(5);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);
  const user = {
    ...req.body,
    password: hashedPassword
  }
  users.push(user)
  return res.status(201).send({status: SUCCESS_MESSAGES.USER_CREATED})
}

async function getProfileDetails(req, res) {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ error:  ERROR_MESSAGES.UNAUTHORIZED})
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    const user = users.find(user => user.email === decoded.email)
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
    const user = users.find(user => user.email === decoded.email)
    if (!user) {
      return res.status(400).json({ error: ERROR_MESSAGES.USER_NOT_FOUND })
    }

    const { password, email, ...userDetails } = user;
    users[users.indexOf(user)] = { ...user, ...req.body }
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
    const user = users.find(user => user.email === decoded.email)
    if (!user) {
      return res.status(400).json({ error: ERROR_MESSAGES.USER_NOT_FOUND })
    }

    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    users[users.indexOf(user)] = { ...user, password: hashedPassword }
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
    const user = users.find(user => user.email === decoded.email)
    if (!user) {
      return res.status(400).json({ error: ERROR_MESSAGES.USER_NOT_FOUND })
    }

    users.splice(users.indexOf(user), 1)
    return res.status(200).send({status: SUCCESS_MESSAGES.USER_DELETED})
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
  deleteProfile
}