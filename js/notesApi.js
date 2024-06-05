const notes = [
  {
    id: 1,
    title: "first note",
    body: "some dummy text first",
    updtaed: "2021-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "second note",
    body: "some dummy text second",
    updtaed: "2021-10-31T15:03:23.556Z",
  },
  {
    id: 3,
    title: "third note",
    body: "some dummy text third",
    updtaed: "2023-06-20T12:22:23.078Z",
  },
];
export default class NotesApi {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.updtaed) > new Date(b.updtaed) ? -1 : 1;
    });
  }
  static saveNote(noteToSave) {
    // existed or not
    const notes = NotesApi.getAllNotes();
    const existedNote = notes.find((n) => n.id == noteToSave.id);
    if (existedNote) {
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
      existedNote.updtaed = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updtaed = new Date().toISOString();
      notes.push(noteToSave);
    }
    return localStorage.setItem("notes-app", JSON.stringify(notes));
  }
  static deleteNode(id) {
    const notes = NotesApi.getAllNotes();
    const filteredNode = notes.filter((n) => n.id != id);
    localStorage.setItem("notes-app", JSON.stringify(filteredNode));
  }
}
