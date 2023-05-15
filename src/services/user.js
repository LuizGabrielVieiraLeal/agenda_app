import { api } from "boot/axios";
import useApi from "src/composables/useApi";

export default function userService() {
  const signIn = async (payload) => {
    try {
      const response = await api.post("sign_in", payload);
      api.defaults.headers.common["Authorization"] = response.data.token;
      return response.data;
    } catch (ex) {
      throw new Error(ex.response.data.error);
    }
  };

  const addAuth = async (token) => {
    try {
      api.defaults.headers.common["Authorization"] = token;
      return true;
    } catch (ex) {
      throw new Error("Erro ao adicionar autorização.");
    }
  };

  const removeAuth = async () => {
    try {
      api.defaults.headers.common["Authorization"] = null;
      return true;
    } catch (ex) {
      throw new Error("Erro ao remover autorização.");
    }
  };

  return { signIn, addAuth, removeAuth };
}
