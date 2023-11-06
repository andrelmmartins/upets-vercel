import axios from "axios";

export const baseURL = process.env.BACKEND_URL || "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
