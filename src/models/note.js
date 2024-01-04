const httpStatus = require("http-status");
const { pool } = require("../../config/database");
const { buildQuery } = require("../../utils/buildQuery");

class Note {
  constructor(title, description, userId) {
    this.noteId = null;
    this.title = title;
    this.description = description;
    this.user_id = userId;
    this.createdat = new Date();
  }

  async save() {
    const { rows } = await pool.query(
      "INSERT INTO notes ( title, description, user_id, createdat) VALUES ($1, $2, $3, $4)",
      [this.title, this.description, this.user_id, this.createdat]
    );
    if (Array.isArray(rows)) {
      return true;
    }
    return false;
  }

  static async getNote(noteId, userId) {
    const { rows } = await pool.query(
      "SELECT * FROM notes WHERE note_id = $1 AND user_id = $2",
      [noteId, userId]
    );

    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  }

  static async getSharedNote(noteId) {
    const { rows } = await pool.query(
      "SELECT * FROM notes WHERE note_id = $1",
      [noteId]
    );

    if (rows.length > 0 && rows[0].is_public) {
      return rows[0];
    } else {
      const error = new Error("This note is not shared...");
      error.statusCode = httpStatus.UNAUTHORIZED;
      throw error;
    }
  }

  static async getNotes(userId) {
    const { rows, rowCount } = await pool.query(
      `SELECT * FROM notes WHERE user_id = $1 `,
      [userId]
    );
    if (rowCount > 0) {
      return rows;
    } else {
      return [];
    }
  }

  static async updateUserNote(note_id, user_id, updateData) {
    //check if note exists
    const { rowCount } = await pool.query(
      "SELECT * FROM notes WHERE note_id = $1 AND user_id = $2",
      [note_id, user_id]
    );
    if (rowCount > 0) {
      const { queryClause, queryArray, objLen } = buildQuery(updateData);
      const query = `UPDATE notes SET ${queryClause} WHERE note_id = $${
        objLen + 1
      } AND user_id = $${objLen + 2}`;

      const values = [...queryArray, note_id, user_id];
      const { rowCount } = await pool.query(query, values);
      if (rowCount === 0) {
        return false;
      } else return true;
    } else {
      const error = new Error("Could not find Note to Update");
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }
  }

  static async deleteNote(note_id, user_id) {
    const { rowCount } = await pool.query(
      "DELETE FROM notes WHERE note_id = $1 AND user_id = $2",
      [note_id, user_id]
    );
    if (rowCount === 0) {
      const error = new Error("Note does not exist");
      error.statusCode = 400;
      throw error;
    }
    return true;
  }

  static async searchNotes(searchQuery, user_id) {
    const { rows } = await pool.query(
      "SELECT * FROM notes WHERE (title ILIKE $1 OR description ILIKE $1) AND user_id = $2",
      [`%${searchQuery}%`, user_id]
    );
    if (rows.length > 0) {
      return rows;
    } else {
      return null;
    }
  }
}

module.exports = {
  Note,
};
