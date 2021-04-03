import { createStore } from "vuex";

import itemsModule from "./items/index.js";

const store = createStore({
  modules: {
    items: itemsModule
  },
  state() {
    return {
      userId: "u1",
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});
export default store;
