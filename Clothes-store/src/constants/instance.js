import axios from "axios";
const instance = axios.create({
  baseURL: "https://localhost:8000/api/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("access")) {
      const TOKEN = JSON.parse(localStorage.getItem("access")); //get token from local storage
      const headers = { ...config.headers, Authorization: `Bearer ${TOKEN}` };
      config.headers = headers;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
