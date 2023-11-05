import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export type NavLinkProps = {
  link: string;
  title: string;
};

const NavLink = ({ link, title }: NavLinkProps) => {
  return (
    <Box
      as="a"
      px={4}
      py={1}
      backgroundColor="transparent"
      textTransform="uppercase"
      fontWeight={600}
      letterSpacing=".1em"
      fontSize="1rem"
      color="#767880"
      _hover={{
        textDecoration: "none",
        color: "white",
      }}
      href={link}
    >
      {title}
    </Box>
  );
};

export default NavLink;
