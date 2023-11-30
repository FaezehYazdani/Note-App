import React, { useEffect, useState } from "react";
import "./App.css";
import Note from "./components/Note";
import INote from "./interfaces/note.interfaces";
import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "./services/noteService";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

function App() {
  const [notesList, setNotesList] = useState<Array<INote>>([]);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNote, setNewNote] = useState({
    link: "",
    text: "",
  });

  const handleCloseAddModal = () => {
    setNewNote({
      link: "",
      text: "",
    });
    setShowAddNoteModal(false);
  };
  const handleShowAddModal = () => setShowAddNoteModal(true);

  useEffect(() => {
    getNotesFromServer();
  }, []);

  useEffect(() => {
    // Skip the initial render
    if (notesList.length === 0) {
      return;
    }

    const notesListString = JSON.stringify(notesList);
    localStorage.setItem("my-notes", notesListString);
  }, [notesList]);

  const getNotesFromServer = async () => {
    const notes = await getNotes();
    setNotesList(notes);
  };

  const updateNoteItem = async (updatedNote: INote) => {
    const noteFromServer = await updateNote(updatedNote);
    const updatedList = notesList.map((noteIteam: INote) => {
      if (noteIteam._id === noteFromServer._id) {
        return noteFromServer;
      }
      return noteIteam;
    });
    setNotesList(updatedList);
  };

  const addNote = async () => {
    const savedNote = await createNote(newNote);
    setNotesList([savedNote, ...notesList]);
    handleCloseAddModal();
  };

  const deleteNoteItem = async (noteToDelete: INote) => {
    await deleteNote(noteToDelete._id);
    const remainingNotes = notesList.filter((noteItem) => {
      return noteItem._id !== noteToDelete._id;
    });

    setNotesList(remainingNotes);
  };

  return (
    <div className="App">
      <Button
        variant="dark"
        className="add-button"
        onClick={handleShowAddModal}
      >
        <div className="add-button-text">+</div>
      </Button>

      <Modal show={showAddNoteModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingTextarea2" label="Text">
            <Form.Control
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  text: newVal,
                });
              }}
              as="textarea"
              placeholder="Enter your note text"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Link"
            className="mb-3 note-link"
          >
            <Form.Control
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  link: newVal,
                });
              }}
              type="url"
              placeholder="Enter note"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addNote}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <div className="notes-list">
          {notesList.map((noteItem, index) => {
            return (
              <Note
                note={noteItem}
                key={index}
                onNoteUpdate={updateNoteItem}
                onNoteDelete={deleteNoteItem}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
