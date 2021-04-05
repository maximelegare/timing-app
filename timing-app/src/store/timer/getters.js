export default{
  timers(state){
    return state.timers
  },
  hasTimers(state){
    return state.timers && state.timers.length > 0
  },
  countdownValues(state){
    return state.countdownValues
  },
  countdownStarted(state){
    return state.countdownValues.timerStatus
  },
  timerExpired(state){
    return state.countdownValues.timerExpired
  }

}