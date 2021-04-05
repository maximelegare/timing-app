export default {
  addTimer(state, payload) {
    state.timers.push(payload);
  },
  loadTimers(state, payload) {
    state.timers = payload;
  },
  deleteTimer(state, payload) {
    
    const filteredTimers = state.timers.filter(function(timer) {
      return timer.id !== payload;
    });
    state.timers = filteredTimers;
  },
  countdownValues(state, payload){
    state.countdownValues = payload
    console.log(state.countdownValues)
  },
};
