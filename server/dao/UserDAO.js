import pool from '../config/db.js';
import User from '../models/User.js';

export class UserDAO {
  static async getAllUsers() {
    const { rows } = await pool.query('SELECT * FROM model."User"');
    return rows.map(row => new User(row.email, row.login, row.password, row.firstName, row.lastName, row.birthYear));
  }

  static async getUserByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM model."User" WHERE email = $1', [email]);
    if (rows.length) {
      const { login, password, firstName, lastName, birthYear } = rows[0];
      return new User(email, login, password, firstName, lastName, birthYear);
    }
    return null;
  }

  static async createUser(user) {
    const { email, login, password, firstName, lastName, birthYear } = user;
    const query = `
      INSERT INTO model."User" (email, login, password, "firstName", "lastName", "birthYear")
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const { rows } = await pool.query(query, [email, login, password, firstName, lastName, birthYear]);
    return new User(...Object.values(rows[0]));
  }

  static async deleteUser(email) {
    const { rowCount } = await pool.query('DELETE FROM model."User" WHERE email = $1', [email]);
    return rowCount > 0;
  }

  static async updateUser(user) {
    const query = `
        UPDATE model."User" 
        SET login = $1,
            "firstName" = $2,
            "lastName" = $3,
            "birthYear" = $4
        WHERE email = $5
        RETURNING *;
    `;
    const values = [
        user.login,
        user.firstName,
        user.lastName,
        user.birthYear,
        user.email
    ];

    const result = await pool.query(query, values);
    return result.rowCount > 0;
  }

  static async updatePassword(user) {
    const query = `
        UPDATE model."User" 
        SET password = $1
        WHERE email = $2
        RETURNING *;
    `;
    const values = [
        user.password,
        user.email
    ];

    const result = await pool.query(query, values);
    return result.rowCount > 0;
  }
}