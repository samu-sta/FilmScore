import pool from '../config/db.js';
import Content from '../models/Content.js';

export class ContentDAO {
  static async getAllContent() {
    try {
      const { rows } = await pool.query('SELECT * FROM model."Content"');
      return rows.map(row => new Content(row.id, row.title, row.genere, row.description, row.duration, row.rate, row.director, row.poster));
    } catch (error) {
      throw new Error('Error fetching content: ' + error.message);
    }
  }

  static async getContentById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM model."Content" WHERE id = $1', [id]);
      if (rows.length) {
        const { title, genere, description, duration, rate, director, poster } = rows[0];
        return new Content(id, title, genere, description, duration, rate, director, poster);
      }
      return null;
    } catch (error) {
      throw new Error('Error fetching content by ID: ' + error.message);
    }
  }

  static async createContent(content) {
    try {
      const { id, title, genere, description, duration, rate, director, poster } = content;
      const query = `
        INSERT INTO model."Content" (id, title, genere, description, duration, rate, director, poster)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
      const { rows } = await pool.query(query, [id, title, genere, description, duration, rate, director, poster]);
      return new Content(...Object.values(rows[0]));
    } catch (error) {
      throw new Error('Error creating content: ' + error.message);
    }
  }

  static async deleteContent(id) {
    try {
      const { rowCount } = await pool.query('DELETE FROM model."Content" WHERE id = $1', [id]);
      return rowCount > 0;
    } catch (error) {
      throw new Error('Error deleting content: ' + error.message);
    }
  }
}