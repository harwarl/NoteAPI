/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns("notes", {
    is_public: {
      type: "boolean",
      default: false,
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns("notes", ["is_public"]);
};
