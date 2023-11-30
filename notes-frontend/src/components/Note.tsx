import React, { FC, FocusEvent, useState } from "react";
import "./Note.css";
import INote from "../interfaces/note.interfaces";

type Props = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
  onNoteDelete: (note: INote) => void;
};

const Note: FC<Props> = ({ note, onNoteUpdate, onNoteDelete }) => {
  const [isFocused, setIsFocused] = useState(false);

  const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
    setIsFocused(false);
    const newTextValue = event.currentTarget.textContent;

    if (newTextValue === note.text) {
      return;
    }

    const updatedNodeObject: INote = {
      ...note,
      text: newTextValue || "",
    };
    onNoteUpdate(updatedNodeObject);
  };

  return (
    <div className={isFocused ? "note note--focused" : "note"}>
      <button
        onClick={() => onNoteDelete(note)}
        type="button"
        className="btn-close"
        aria-label="Close"
      ></button>
      <div
        onBlur={noteTextUpdated}
        onFocus={() => setIsFocused(true)}
        className="note__text"
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {note.text}
      </div>
      <div className="note__link">
        <a>{note.link}</a>
      </div>
    </div>
  );
};

export default Note;
