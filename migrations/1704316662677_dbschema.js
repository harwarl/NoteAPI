/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    user_id: "id",
    username: { type: "varchar(200)", notNull: true },
    email: { type: "varchar(200)", notNull: true },
    password: { type: "varchar(500)", notNull: true },
    createdat: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("notes", {
    note_id: "id",
    title: { type: "varchar(200)", notNull: true },
    description: { type: "varchar(8000)", notNull: true },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
  });
  pgm.createIndex("notes", "user_id");
};

exports.down = (pgm) => {
  pgm.dropTable("notes");
  pgm.dropTable("users");
};
