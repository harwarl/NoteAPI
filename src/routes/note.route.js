const { validator } = require("../middlewares/validator");
const { schemas } = require("../../utils/validator");
const { isAuth } = require("../middlewares/isAuth");
const {
  addNote,
  updateNote,
  deleteNote,
  getNote,
  getNotes,
  shareNote,
} = require("../controllers/note.controller");

const router = require("express").Router();

router.get("/", isAuth, getNotes);
router.get("/:id", isAuth, getNote);
router.post("/", validator(schemas.addNote), isAuth, addNote);
router.post("/:id/share", isAuth, shareNote);
router.put("/:id", validator(schemas.updateNote), isAuth, updateNote);
router.delete("/:id", isAuth, deleteNote);

module.exports = router;
