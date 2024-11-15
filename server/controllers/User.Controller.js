import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
import { TIME_EXPIRATION, COOKIE_NAME, ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants/constants.js"
import { UserDAO } from "../dao/UserDAO.js"
import { validateLogin, validateRegister } from "../schemas/users.js"

dotenv.config()

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
  return res.status(200).send({ status: SUCCESS_MESSAGES.LOGIN_SUCCESS })
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
  return res.status(201).send({ status: SUCCESS_MESSAGES.USER_CREATED })
}

async function getProfileDetails(req, res) {
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

async function changePassword(req, res) {
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
    return res.status(200).send({ status: SUCCESS_MESSAGES.PASSWORD_CHANGED })
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
    return res.status(200).send({ status: SUCCESS_MESSAGES.USER_DELETED })
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

async function logout(req, res) {
  res.clearCookie(COOKIE_NAME)
  return res.status(200).send({status: SUCCESS_MESSAGES.LOGOUT_SUCCESS})
}

export const userController = {
  login,
  register,
  getProfileDetails,
  putProfileDetails,
  changePassword,
  deleteProfile,
  getEmail,
  logout
}