import { api } from "boot/axios";

export default function useApi(url) {
  const create = async (payload) => {
    try {
      const response = await api.post(url, payload);
      return response.data;
    } catch (ex) {
      throw new Error(ex.response.data.error);
    }
  };

  const list = async () => {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (ex) {
      throw new Error(ex.response.data.error);
    }
  };

  const update = async (payload) => {
    try {
      const response = await api.patch(
        `${url}/${Object.values(payload)[0].id}`,
        payload
      );
      return response.data;
    } catch (ex) {
      throw new Error(ex.response.data.error);
    }
  };

  const destroy = async (id) => {
    try {
      const response = await api.delete(`${url}/${id}`);
      return response.data;
    } catch (ex) {
      throw new Error(ex.response.data.error);
    }
  };

  return { create, list, update, destroy };
}
