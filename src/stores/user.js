import axios from "axios";
import { defineStore } from "pinia";
import { LocalStorage, SessionStorage } from "quasar";

export const userStore = defineStore("user", {
  state: () => ({
    _currentUser: null,
    _token: null,
  }),
  getters: {
    getUser: (state) => state._currentUser,
    getToken: (state) => state._token,
  },
  actions: {
    async signIn(data, keepConnected) {
      await axios
        .post(`${process.env.baseURL}/login`, { user: data })
        .then((res) => {
          this._currentUser = res.data.user;
          this._token = res.data.token;

          if (keepConnected) {
            LocalStorage.set(process.env.storageName, {
              currentUser: this._currentUser,
              token: this._token,
            });
          } else {
            SessionStorage.set(process.env.storageName, {
              currentUser: this._currentUser,
              token: this._token,
            });
          }
        })
        .catch((ex) => {
          throw ex;
        });
    },
    async signUp(data) {},
  },
});
