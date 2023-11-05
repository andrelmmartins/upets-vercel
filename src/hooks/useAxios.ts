import { useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "../api/instance";
import { AxiosRequestConfig } from "axios";
import { useRefreshToken } from "./useRefreshToken";

export const useAxios = () => {
  const refreshToken = useRefreshToken();
  const session = useSession();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      async (request) => {
        if (!request.headers.Authorization) {
          request.headers.Authorization = `Bearer ${session?.data?.user.token}`;
        }
        return request;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newToken = await refreshToken();
          prevRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(prevRequest as AxiosRequestConfig);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return axios;
};
