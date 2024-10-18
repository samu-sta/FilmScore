import { validateLogin, validateRegister } from "../schemas/users.js";
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';

dotenv.config()

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const moviesPath = path.join(__dirname, '../data/movies.json');

async function getMovies(req, res) {
  const data = await fs.readFile(moviesPath, 'utf-8');
  return res.status(200).send(data)
}
const users = [
  {
    email: "samuelfelipelorente@gmail.com",
    password: "$2a$05$LUohyBmZzysOGHzWHeYi0.1xkcXB2BgjFtQapJyTffad9TbOYg.ma",
    login: "yourlogin",
    lastName: "Doe",
    firstName: "John",
    birthYear: 1990
  }
]
async function login(req, res) {
  const result = validateLogin(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const user = users.find(user => user.email === req.body.email)
  if (!user) {
    return res.status(400).json({ error: "User not found" })
  }

  const validPassword = await bcryptjs.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid password" })
  }

  const token = jsonwebtoken.sign({ email: user.email }, process.env.JWT_SECRET
    , { expiresIn: '1h' }
  )
  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
    path: '/', // La cookie es válida para todo el dominio // Controla si la cookie se envía con solicitudes de sitios cruzados
  };

  res.cookie('jwt', token, cookieOptions)
  return res.status(200).send({status: "User logged in"})


}

async function register(req, res) {

  const result = validateRegister(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const userRegistered = users.find(user => user.email === req.body.email)
  if (userRegistered) {
    return res.status(400).json({ error: "User already registered" })
  }

  const salt = await bcryptjs.genSalt(5);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);
  const user = {
    ...req.body,
    password: hashedPassword
  }
  users.push(user)
  return res.status(201).send({status: "User registered"})
}

async function getProfileDetails(req, res) {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    const user = users.find(user => user.email === decoded.email)
    if (!user) {
      return res.status(400).json({ error: "User not found" })
    }

    const { password, email, ...userDetails } = user;
    return res.status(200).send(userDetails)
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" })
  }
}

async function putProfileDetails(req, res) {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    const user = users.find(user => user.email === decoded.email)
    if (!user) {
      return res.status(400).json({ error: "User not found" })
    }

    const { password, email, ...userDetails } = user;
    users[users.indexOf(user)] = { ...user, ...req.body }
    return res.status(200).send(userDetails)
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" })
  }
}

async function changePassword (req, res) {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    const user = users.find(user => user.email === decoded.email)
    if (!user) {
      return res.status(400).json({ error: "User not found" })
    }

    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    users[users.indexOf(user)] = { ...user, password: hashedPassword }
    return res.status(200).send({status: "Password changed"})
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" })
  }
}

export const methods = {
  login,
  register,
  getMovies,
  getProfileDetails,
  putProfileDetails,
  changePassword
}