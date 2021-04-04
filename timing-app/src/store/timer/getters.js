export default{
  timers(state){
    return state.timers
  },
  hasTimers(state){
    return state.timers && state.timers.length > 0
  } 
}