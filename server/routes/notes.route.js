const express = require("express");
const { authenticateToken } = require("../verifyToken");
const Note = require("../models/notes.model");
const router = express.Router();
router.post("/api/add-notes", authenticateToken, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { user } = req.user;
    if (!title) {
      return res
        .status(400)
        .json({ error: true, message: "Title is required" });
    }
    if (!content) {
      return res
        .status(400)
        .json({ error: true, message: "Content is required" });
    }
    const newNote = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await newNote.save();
    return res
      .status(200)
      .json({ error: false, mote: newNote, message: "Note added sucessfully" });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
});
router.put("/api/edit-note/:noteId", authenticateToken, async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;
    if (!title && !content && !tags) {
      return res
        .status(400)
        .json({ error: true, message: "No channges provided" });
    }
    // const note = await Note.findOne({ _id: noteId, userId: user._id });
    // if (!note) {
    //   return res.status(400).json({ error: true, message: "Note not found" });
    // }
    // if (title) note.title = title;
    // if (content) note.content = content;
    // if (tags) note.tags = tags;
    // if (isPinned) note.isPinned = isPinned;
    // await note.save();
    const note = await Note.findByIdAndUpdate(
      {
        _id: noteId,
        userId: user._id,
      },
      {
        title,
        content,
        tags,
        isPinned,
      },
      {
        new: true,
      }
    );
    if (!note) {
      return res.status(400).json({ error: true, message: "Note not found" });
    }
    return res
      .status(200)
      .json({ error: false, note, message: "Note updated sucessfully" });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});
router.get("/api/get-notes", authenticateToken, async (req, res) => {
  try {
    const { user } = req.user;
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    return res
      .status(200)
      .json({ error: false, notes, message: "Notes fetched successfully" });
  } catch (error) {
    return res.status(404).json({ error: true, message: error.message });
  }
});

router.delete(
  "/api/delete-note/:noteId",
  authenticateToken,
  async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const { user } = req.user;
      const note = await Note.findByIdAndDelete({
        _id: noteId,
        userId: user._id,
      });
      if (!note) {
        return res.status(400).json({ error: true, message: "Note not found" });
      }
      return res
        .status(200)
        .json({ error: false, message: "Note deleted successfully" });
    } catch (error) {
      res.status(404).json({ error: true, message: error.message });
    }
  }
);

// Update isPinned Value
router.put(
  "/api/update-note-pinned/:noteId",
  authenticateToken,
  async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const { isPinned } = req.body;
      const { user } = req.user;
      const note = await Note.findOne({ _id: noteId, userId: user._id });
      if (!note) {
        return res.status(400).json({ error: true, message: "Note not found" });
      }
      note.isPinned = isPinned;
      await note.save();
      return res
        .status(200)
        .json({ error: true, message: "Note updated", isPinned });
    } catch (error) {
      res.status(404).json({ error: true, message: error.message });
    }
  }
);

module.exports = router;
