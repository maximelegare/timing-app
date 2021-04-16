import { createStore } from "vuex";

import notesModule from "./notes/index.js";
import authModule from './auth/index.js'
import timerModule from "./timer/index.js";
import formModule from './form-section/index.js'
const store = createStore({
  modules: {
    notes: notesModule,
    timers: timerModule,
    auth:authModule,
    form:formModule
  },
});
export default store;
