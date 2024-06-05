import NotesApi from "./notesApi.js";
import NotesView from "./NotesView.js";
export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());
    this.refreshNotes();
  }
  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: "New Note",
          body: "Take Some Note",
        };
        NotesApi.saveNote(newNote);
        this.refreshNotes();
      },
      onNoteEdit: (newTitle, newBody) => {
        NotesApi.saveNote({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        });
        this.refreshNotes();
      },
      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find((n) => n.id == noteId);
        this._setActiveNote(selectedNote);
        // select :=> 1.selected class add  , title , body => preview update
        // view.updateActiveNote(note)
      },
      onNoteDelete: (noteId) => {
        NotesApi.deleteNode(noteId);
        this.refreshNotes();
      },
    };
  }
  refreshNotes() {
    const notes = NotesApi.getAllNotes();
    // set notes
    this._setNotes(notes);
    // set active note
    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }
  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }
  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }
}
