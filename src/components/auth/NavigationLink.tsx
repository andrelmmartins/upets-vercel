"use client";

import React from "react";
import { Link } from "@chakra-ui/next-js";
import { Flex, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

export default function NavigationLink() {
  const pathname = usePathname();

  const paths: Record<
    string,
    { text: string; highlightedText: string; redirectTo: string }
  > = {
    "/auth/forgot": {
      text: "Lembrou a senha?",
      highlightedText: "Acesse!",
      redirectTo: "/auth/signin",
    },
    "/auth/change": {
      text: "Lembrou a senha?",
      highlightedText: "Acesse!",
      redirectTo: "/auth/signin",
    },
    "/auth/signin": {
      text: "Não tem uma conta?",
      highlightedText: "Cadatre-se!",
      redirectTo: "/auth/signup",
    },
    "/auth/signup": {
      text: "Já tem um conta?",
      highlightedText: "Acesse!",
      redirectTo: "/auth/signin",
    },
  };

  if (!paths[pathname]) return null;

  return (
    <Flex
      h="5rem"
      justify="center"
      align="center"
      bg="black"
      color="white"
      pt="0.625rem"
    >
      <Link
        href={paths[pathname]?.redirectTo}
        fontSize="1.25rem"
        fontWeight="bold"
      >
        {paths[pathname]?.text}{" "}
        <Text as="span" textDecor="underline" fontSize="1.25rem" color="white">
          {paths[pathname]?.highlightedText}
        </Text>
      </Link>
    </Flex>
  );
}
