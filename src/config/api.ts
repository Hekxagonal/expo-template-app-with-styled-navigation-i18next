import { API_URL } from "@env";
import rawAxios, { AxiosError } from "axios";

import { getUserData } from "~services/UserDataService";

export const baseURL = API_URL;

console.log(`using: ${baseURL}`);

const axios = rawAxios.create({
  baseURL
});

axios.interceptors.request.use((config) => {
  const result = getUserData().then((res) => {
    if (res?.token) {
      config.headers = { Authorization: `Bearer ${res?.token}` };
    }

    return config;
  });

  return result;
});

axios.interceptors.response.use(
  (res) => {
    console.log(res.request.responseURL + ":", "success");
    return res;
  },
  (error: AxiosError) => {
    console.log(error.request.responseURL + ":", error.request);
    return Promise.reject(error);
  }
);

export { axios };
