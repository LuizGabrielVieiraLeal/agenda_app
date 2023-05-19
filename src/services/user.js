import { api } from "boot/axios";
import { LocalStorage, SessionStorage } from "quasar";
import useApi from "src/composables/useApi";

export default function userService() {
  const _lStorage = LocalStorage.getItem(process.env.storageName);
  const _sStorage = SessionStorage.getItem(process.env.storageName);

  const { update, destroy } = useApi("users");

  const _saveLocal = (user, token) => {
    LocalStorage.set(process.env.storageName, {
      currentUser: user,
      token: token,
    });
  };

  const _saveSession = (user, token) => {
    SessionStorage.set(process.env.storageName, {
      currentUser: user,
      token: token,
    });
  };

  const _clearStorage = () => {
    if (_lStorage !== null) LocalStorage.remove(process.env.storageName);
    if (_sStorage !== null) SessionStorage.remove(process.env.storageName);
  };

  const _addAuth = (token) => {
    try {
      api.defaults.headers.common["Authorization"] = token;
    } catch (ex) {
      throw new Error("Erro ao adicionar autorização.");
    }
  };

  const _removeAuth = () => {
    try {
      api.defaults.headers.common["Authorization"] = null;
    } catch (ex) {
      throw new Error("Erro ao remover autorização.");
    }
  };

  const isStored = () => {
    if (
      (_lStorage !== null && _lStorage.currentUser !== null) ||
      (_sStorage !== null && _sStorage?.currentUser !== null)
    )
      return true;
    else return false;
  };

  const loadCurrentUser = () => {
    try {
      if (_lStorage !== null) {
        _addAuth(_lStorage.token);
        return _lStorage;
      } else if (_sStorage !== null) {
        _addAuth(_sStorage.token);
        return _sStorage;
      } else {
        return { currentUser: null, token: null };
      }
    } catch (ex) {
      throw new Error("Falha ao carregar usuário.");
    }
  };

  const login = async (payload, keepConnected) => {
    try {
      const response = await api.post("sign_in", payload);
      _addAuth(response.data.token);
      keepConnected
        ? _saveLocal(response.data.user, response.data.token)
        : _saveSession(response.data.user, response.data.token);
      return response.data;
    } catch (ex) {
      throw new Error(ex.response.data.error);
    }
  };

  const logout = () => {
    _removeAuth();
    _clearStorage();
  };

  const signUp = async (payload, keepConnected) => {
    try {
      const response = await api.post("sign_up", payload);
      _addAuth(response.data.token);
      keepConnected
        ? _saveLocal(response.data.user, response.data.token)
        : _saveSession(response.data.user, response.data.token);
      return response.data;
    } catch (ex) {
      throw new Error(ex.response.data.error);
    }
  };

  return { isStored, loadCurrentUser, login, logout, signUp, update, destroy };
}
