const { pool } = require("../../config/database");

class User {
  constructor(username, email, password) {
    this.userId = null;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdat = new Date();
  }

  static async findUserByEmail(email) {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  }

  static async findUserById(id) {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  }

  async save() {
    const { rows } = await pool.query(
      "INSERT INTO users (username, email, password, createdat) VALUES ($1, $2, $3, $4)",
      [this.username, this.email, this.password, this.createdat]
    );
    return rows;
  }
}

module.exports = {
  User,
};
