export default{
    notes(state){
        return state.notes     
    },
   hasNotes(state){
       return state.notes && state.notes.length > 0
   }
}