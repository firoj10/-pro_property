// import axios from "axios";
// // import { logout } from "./../redux/slices/authSlice/authSlice";
// import { getAccessToken, getRefreshToken, setTokens } from "./tokenUtils";
// const BASE_URL = import.meta.env.VITE_BASE_API;

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
// });
// // console.log(BASE_URL)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = getAccessToken();
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = getRefreshToken();
//       if (!refreshToken) {
//         // Lazy-load the store only when needed
//         // store.dispatch(logout());
//         return Promise.reject("No refresh token available");
//       }
//       try {
//         const response = await axios.post(`${BASE_URL}/user/token/refresh/`, { refresh: refreshToken });
//         const { access } = response.data;
//         setTokens(access, refreshToken);
//         originalRequest.headers["Authorization"] = `Bearer ${access}`;
//         return axios(originalRequest);
//       } catch (refreshError) {
//         // store.dispatch(logout());
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
// export default axiosInstance;


import axios from "axios";
// import { logout } from "./../redux/slices/authSlice/authSlice";
import { getAccessToken, getRefreshToken, setTokens } from "./tokenUtils";
const BASE_URL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
// console.log(BASE_URL)
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        // Lazy-load the store only when needed
        const store = require("./../redux/store").default;
        // store.dispatch(logout());
        return Promise.reject("No refresh token available");
      }
      try {
        const response = await axios.post(`${BASE_URL}/user/token/refresh/`, { refresh: refreshToken });
        const { access } = response.data;
        setTokens(access, refreshToken);
        originalRequest.headers["Authorization"] = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        const store = require("./../redux/store").default;
        // store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;