import axios from "axios";

export const baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL,
  insecureHTTPParser: true,
});

export default axiosInstance;
