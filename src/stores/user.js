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
    loadUser() {
      if (this._currentUser === null || this._token === null) {
        const sessionData = SessionStorage.getItem(process.env.storageName);
        const localData = LocalStorage.getItem(process.env.storageName);

        if (sessionData !== null) {
          this._currentUser = sessionData.currentUser;
          this._token = sessionData.token;
        }

        if (localData !== null) {
          this._currentUser = localData.currentUser;
          this._token = localData.token;
        }

        axios.defaults.headers.common["Authorization"] = this._token;
      }
    },
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
          axios.defaults.headers.common["Authorization"] = this._token;
        })
        .catch((ex) => {
          throw ex;
        });
    },
    async signUp(data) {},
  },
});
