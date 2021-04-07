export default {
  addNote(state, payload) {
    state.notes.push(payload)
    
  },
  loadNotes(state, payload) {
    state.notes = payload;
  
  },
  deleteNote(state, payload) {
    
    const filteredNotes = state.notes.filter(function(note) {
      return note.id !== payload;
    });
    
    state.notes = filteredNotes;
  },
};
