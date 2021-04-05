export default {
  addNote(state, payload) {
    state.notes.push(payload)
    console.log(state.notes)  
  },
  loadNotes(state, payload) {
    state.notes = payload;
    console.log(state.notes)
  },
  deleteNote(state, payload) {
    
    const filteredNotes = state.notes.filter(function(note) {
      return note.id !== payload;
    });
    
    state.notes = filteredNotes;
  },
};
