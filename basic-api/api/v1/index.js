// Suppose to create some routes
const express = require('express');
const notesRouter = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Note = require("../../db/models/note.model");
const noteModel = require('../../db/models/note.model');

// notes (/note)
// Get elements => GET
// Get element by ID => GET /:id/
// Add element => POST
// Delete element => DELETE /:id/

/**
 * Get all the notes
 */
notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({});

    res.json({
        notes,
    })
});

/**
 * Add a new note
 */
notesRouter.post("/", (req, res) => {
    const newNote = new Note(req.body)
    newNote.save().then((savedNote) => {
        res.json({
            note: savedNote,
            succedd: true,
        })
    })
});

/**
 * Get a note by id
 */
notesRouter.get('/:id', async (req, res) => {
    const noteId = req.params.id;

    try {
        const note = await noteModel.findById(noteId);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        console.log(note);

        res.json({
            reply: "Note by id success",
            note,
        });

    } catch (error) {
        // Handle other errors, e.g., database connection issues, etc.
        console.error(error);
        res.status(500).json({
            message: error.message,
        });
    }
})

/**
 * Delete a note by its id
 */
notesRouter.delete('/:id', async (req, res) => {
    const noteId = req.params.id;

    // Validate that the ID is a valid mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(400).json({
            message: "Invalid note ID"
        });
    }

    let deletedNote;

    try {
        deletedNote = await noteModel.findByIdAndDelete(noteId);
        console.log(deletedNote);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }

    if (!deletedNote) {
        return res.status(404).json({
            message: "Note not found for deletion"
        });
    }

    res.json({
        reply: `Note with ${noteId} has been deleted`,
        deletedNote
    });
});

/**
 * Update a note
 */

notesRouter.put("/:id", async (req, res) => {

    const noteId = req.params.id;
    const updatedBody = req.body;

    // Validate that the ID is a valid mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(400).json({
            message: "Invalid note ID"
        });
    }

    let updatedNote = await noteModel.findByIdAndUpdate(noteId, updatedBody, {new: true});

    console.log(updatedNote)

    if (!updatedNote) {
        return res.status(404).json({
            message: "No note to be updated"
        })
    }

    res.json({
        reply: `note with id ${noteId} has been updated`,
        note: updatedNote
    })


})

module.exports = {
   notesRouter,
}