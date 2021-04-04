import { createStore } from "vuex";

import notesModule from "./notes/index.js";

import timerModule from "./timer/index.js";
const store = createStore({
  modules: {
    notes: notesModule,
    timers: timerModule,
  },
  state() {
    return {
      userId: "u2",

    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
   
  },
});
export default store;
