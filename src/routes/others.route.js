const { isAuth } = require("../middlewares/isAuth");
const {
  searchNotes,
  getSharedNote,
} = require("../controllers/note.controller");

const router = require("express").Router();

router.get("/search", isAuth, searchNotes);
router.get("/shared/:id", isAuth, getSharedNote);

module.exports = router;
