export default {
  addNote(state, payload) {
    const foundUser = state.users.findIndex(
      (user) => user.userId === payload.userId
    );
    const note = {
      id: new Date().getDate(),
      title: payload.title,
      content: payload.content,
    };
    state.users[foundUser].notes.push(note);
    
  },
  addTimer(state, payload) {
    const foundUser = state.users.findIndex(
      (user) => user.userId === payload.userId
    );
    const timer = {
        id :new Date().getDate(),
        title: payload.title,
        time:{
            hours:payload.time.hours,
            minutes:payload.time.minutes,
            seconds:payload.time.seconds
        }
    }
    console.log(timer)
    state.users[foundUser].timers.push(timer)
  },
};
