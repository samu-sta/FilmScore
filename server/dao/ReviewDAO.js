import pool from '../config/db.js';
import Review from '../models/Review.js';
import { v4 as uuidv4 } from 'uuid';

export class ReviewDAO {
  static async getAllReviews() {
    const { rows } = await pool.query('SELECT * FROM model."Review"');
    return rows.map(row => new Review(row.id, row.author, row.rate, row.content, row.User_fk, row.Content_fkey));
  }

  static async getReviewById(id) {
    const { rows } = await pool.query('SELECT * FROM model."Review" WHERE id = $1', [id]);
    if (rows.length) {
      const { author, rate, content, User_fk, Content_fkey } = rows[0];
      return new Review(id, author, rate, content, User_fk, Content_fkey);
    }
    return null;
  }

  static async getReviewsByContentId(contentId) {
    const { rows } = await pool.query(
      `SELECT *, "login" as author
       FROM model."Review" 
       JOIN model."User" ON "User_fk" = "email"
       WHERE "Content_fkey" = $1
       `, [contentId]);
    return rows.map(row => new Review(row.id, row.author, row.rate, row.content, row.User_fk, row.Content_fkey));
  }

  static async createReview(review) {
    const id = uuidv4();
    const { rate, content, userFk, contentFk } = review;
    const query = `
      INSERT INTO model."Review" (id, rate, content, "User_fk", "Content_fkey")
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const { rows } = await pool.query(query, [id, rate, content, userFk, contentFk]);
    return new Review(...Object.values(rows[0]));
  }

  static async deleteReview(id) {
    const { rowCount } = await pool.query('DELETE FROM model."Review" WHERE id = $1', [id]);
    return rowCount > 0;
  }
}