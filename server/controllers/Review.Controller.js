import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ReviewDAO } from "../dao/ReviewDAO.js";
import { UserDAO } from "../dao/UserDAO.js";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants/constants.js";
dotenv.config()

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
      userFk: user.email,
      contentFk
    }

    console.log(review)
    await ReviewDAO.createReview(review)
    return res.status(201).send({ status: SUCCESS_MESSAGES.REVIEW_CREATED })

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


    const { userFk, contentFk } = req.params;
    console.log(userFk, contentFk)
    const review = await ReviewDAO.getReviewById(userFk, contentFk)
    if (!review) {
      return res.status(400).json({ error: ERROR_MESSAGES.REVIEW_NOT_FOUND })
    }
    console.log(review)

    if (review.userFk !== user.email) {
      return res.status(403).json({ error: ERROR_MESSAGES.FORBIDDEN })
    }

    await ReviewDAO.deleteReview(userFk, contentFk)
    return res.status(200).send({ status: SUCCESS_MESSAGES.REVIEW_DELETED })
  } catch (error) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_TOKEN })
  }
}

export const reviewController = {
  getContentReviews,
  postContentReview,
  removeContentReview
};