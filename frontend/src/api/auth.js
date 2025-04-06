// import axios from "axios";

// const API_URL = "http://192.168.0.103:8000/api";

// export const register = async (userData) => {
//   return axios.post(`${API_URL}register/`, userData);
// };

// export const login = async (userData) => {
//   return axios.post(`${API_URL}token/`, userData);
// };

// export const refreshToken = async (refreshToken) => {
//   return axios.post(`${API_URL}token/refresh/`, { refresh: refreshToken });
// };
import axios from "axios";

// Ensure API_URL is correctly loaded
const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL:", API_URL); // Debugging: Check if it's undefined

export const register = async (userData) => {
  return axios.post(`${API_URL}/api/register/`, userData);
};

export const login = async (userData) => {
  return axios.post(`${API_URL}/api/token/`, userData);
};

export const refreshToken = async (refreshToken) => {
  return axios.post(`${API_URL}/api/token/refresh/`, { refresh: refreshToken });
};
