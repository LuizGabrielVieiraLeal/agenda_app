import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => ({
    _currentUser: null,
    _token: null,
  }),
  getters: {
    currentUser: (state) => state._currentUser,
    token: (state) => state._token,
  },
  actions: {
    setCurrentUser(currentUser) {
      this._currentUser = currentUser;
    },
    setToken(token) {
      this._token = token;
    },
  },
});
