import axios from "axios";
import { UserData } from "../interfaces/UserInterface";

//sample development environment
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchUsers = async () =>
  await axios.request<UserData>({
    url: `${BASE_URL}/api`,
    method: "get",
  });

// Add a custom config for request interceptor if there are some
axios.interceptors.request.use(
  async (config) => {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor if there are some
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response date
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
