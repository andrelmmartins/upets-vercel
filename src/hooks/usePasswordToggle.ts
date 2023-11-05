import { useState } from "react";

import { PasswordType } from "../components/auth/PasswordToggle";

export const usePasswordToggle = () => {
  return useState<PasswordType>("password");
};
