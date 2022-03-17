import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      loginStatus: false,
      userName: "",
      userPhone: "",
      userAddress: "",
    };
  },
  getters: {
    getLoginStatus(state) {
      return state.loginStatus;
    },
    getUserName(state) {
      return state.userName;
    },
    getUserPhone(state) {
      return state.userPhone;
    },
    getUserAddress(state) {
      return state.userAddress;
    },
  },
  mutations: {
    setLoginStatus(state, payLoad) {
      state.loginStatus = payLoad;
    },
    setUserName(state, payLoad) {
      state.userName = payLoad;
    },
    setUserPhone(state, payLoad) {
      state.userPhone = payLoad;
    },
    setUserAddress(state, payLoad) {
      state.userAddress = payLoad;
    },
  },
});
export default store;
