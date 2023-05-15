import { LocalStorage, SessionStorage } from "quasar";

const lStorage = LocalStorage.getItem(process.env.storageName);
const sStorage = SessionStorage.getItem(process.env.storageName);

export const isAuthenticated = () => lStorage !== null || sStorage !== null;

export const authenticatedUser = () => {
  if (lStorage !== null) {
    return { currentUser: lStorage.currentUser, token: lStorage.token };
  }

  if (sStorage !== null) {
    return { currentUser: sStorage.currentUser, token: sStorage.token };
  }
};

export const saveLocal = (user, token) => {
  LocalStorage.set(process.env.storageName, {
    currentUser: user,
    token: token,
  });
};

export const saveSession = (user, token) => {
  SessionStorage.set(process.env.storageName, {
    currentUser: user,
    token: token,
  });
};

export const clearStorage = () => {
  if (lStorage !== null) LocalStorage.remove(process.env.storageName);
  if (sStorage !== null) SessionStorage.remove(process.env.storageName);
};
