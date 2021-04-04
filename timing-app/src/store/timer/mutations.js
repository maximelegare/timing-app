export default {
  addTimer(state, payload) {
    state.timers.push(payload);
  },
  loadTimers(state, payload) {
    state.timers = payload;
  },
};
