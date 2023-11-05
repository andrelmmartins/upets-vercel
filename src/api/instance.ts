import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXTAUTH_URL || "http://localhost:3001",
});

export default axiosInstance;
