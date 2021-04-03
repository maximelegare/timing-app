export default {
  addNote(context, payload) {
    context.commit("addNote", payload);
  },
  addTimer(context, payload){
      context.commit('addTimer', payload)
  }
};
