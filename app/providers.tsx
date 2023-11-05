"use client"; // ---> this line does the trick

import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ReactNode } from "react";

import { theme } from "./theme";
import PetsProvider from "@/src/context/PetsProvider";

type ProviderType = {
  children: ReactNode;
};

const Providers = ({ children }: ProviderType) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <PetsProvider>{children}</PetsProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
