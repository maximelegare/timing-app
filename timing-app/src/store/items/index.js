import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import users from './usersData.js'


export default {
  namespaced: true,
  state() {
    return {
      users
    };
  },
  getters,
  mutations,
  actions,
};
