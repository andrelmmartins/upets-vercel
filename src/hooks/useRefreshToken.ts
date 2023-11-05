import axios from "../api/instance";
import { useSession } from "next-auth/react";

type RefreshTokenResponse = {
  refresh_token: string;
};

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    try {
      const response = await axios.post<RefreshTokenResponse>("/auth/refresh", {
        refresh: session?.user.token,
      });

      if (session) session.user.token = response.data.refresh_token;
      return response.data.refresh_token;
    } catch (error) {
      console.log(error);
    }
  };

  return refreshToken;
};
