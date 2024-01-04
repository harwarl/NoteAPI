/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createIndex("users", ["username", "email"], { unique: true });
};

exports.down = (pgm) => {
  pgm.dropIndex("users", ["username", "email"]);
};
