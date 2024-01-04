const httpStatus = require("http-status");
const { isObjectEmpty } = require("../../utils/checkObject");
const { Note } = require("../models/note");

async function addNote(req, res, next) {
  const userId = req.userId;
  try {
    const { title, description } = req.body;
    const newNote = new Note(title, description, userId);
    const values = newNote.save();
    if (!values) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: false, message: "Creation failed" });
    }
    return res
      .status(httpStatus.OK)
      .json({ status: true, message: "Note Created" });
  } catch (error) {
    console.log("Add Note Error -", error.message);
    next(error);
  }
}

async function getNote(req, res, next) {
  const userId = req.userId;
  const noteId = Number(req.params.id);

  try {
    const note = await Note.getNote(noteId, userId);
    return res.status(httpStatus.OK).json({ status: true, note });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getNotes(req, res, next) {
  const userId = req.userId;
  //   const filters = req.query;
  try {
    const Notes = await Note.getNotes(userId); //,filters
    return res.status(httpStatus.OK).json({ status: true, Notes });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function updateNote(req, res, next) {
  const userId = req.userId;
  const id = Number(req.params.id);
  try {
    const { title, description } = req.body;
    const updated = {};
    if (typeof title === "string") {
      updated.title = title;
    }
    if (typeof description === "string") {
      updated.description = description;
    }
    if (isObjectEmpty(updated)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: false, updated: false });
    }
    const updatedNote = await Note.updateUserNote(id, userId, updated);
    if (!updatedNote) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: true, updated: false, message: "Could not update" });
    }
    return res.status(httpStatus.OK).json({ status: true, updated: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteNote(req, res, next) {
  const userId = req.userId;
  const id = Number(req.params.id);
  try {
    const deleted = await Note.deleteNote(id, userId);
    if (!deleted) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: true, deleted: false });
    }
    return res.status(httpStatus.OK).json({ status: true, deleted: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function searchNotes(req, res, next) {
  const userId = req.userId;
  const q = req.query.q;
  try {
    const matchingNotes = await Note.searchNotes(q, userId);
    if (!matchingNotes) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: true, message: "Search Term matches no notes" });
    }
    return res
      .status(httpStatus.OK)
      .json({ status: true, notes: matchingNotes });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function shareNote(req, res, next) {
  const userId = req.userId;
  const id = Number(req.params.id);
  const { protocol } = req;
  const host = req.get("host");
  try {
    const updated = { is_public: true };
    const updatedNote = await Note.updateUserNote(id, userId, updated);
    if (!updatedNote) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: true, updated: false, message: "Could not update" });
    }

    return res.status(httpStatus.OK).json({
      status: true,
      updated: true,
      shareLink: `${protocol}://${host}/api/shared/${id}`,
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
}

async function getSharedNote(req, res, next) {
  const noteId = req.params.id;
  try {
    const note = await Note.getSharedNote(noteId);
    return res.status(httpStatus.OK).json({ status: true, note });
  } catch (error) {
    console.log("Get shared Note error -", error.message);
    next(error);
  }
}
module.exports = {
  addNote,
  getNote,
  getNotes,
  updateNote,
  deleteNote,
  shareNote,
  searchNotes,
  getSharedNote,
};
