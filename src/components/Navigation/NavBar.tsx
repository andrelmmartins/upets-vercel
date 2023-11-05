"use client";

import {
  Avatar,
  Box,
  Button,
  useDisclosure,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Container,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { usePathname } from "next/navigation";
import ActiveLink from "./ActiveLink";
import NavLink from "./NavLink";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import { useRouter } from "next/navigation";

const links = [
  {
    label: "Publicações",
    link: "/home",
  },
  {
    label: "Pets",
    link: "/pets",
  },
  {
    label: "Lar Temporario",
    link: "/temporaryHouses",
  },
  {
    label: "Cuidadores",
    link: "/caretakers",
  },
];

function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathName = usePathname();
  const router = useRouter();
  const { data } = useSession();

  return (
    <>
      <Flex backgroundColor="#636FFF" p={16} justifyContent="center">
        <Image src="logo-white.svg" alt="logo" width={250} height={60} />
      </Flex>
      <Box bg="black">
        <Container>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {links.map((item) =>
                  item.link === pathName ? (
                    <ActiveLink key={item.link} title={item.label} />
                  ) : (
                    <NavLink
                      key={item.link}
                      link={item.link}
                      title={item.label}
                    />
                  )
                )}
              </HStack>
            </HStack>
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"md"} src={data?.user?.image || ""} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => router.push("/user")}>
                    Perfil
                  </MenuItem>
                  <Divider my={2} />
                  <MenuItem
                    onClick={() =>
                      signOut({ redirect: true, callbackUrl: "/auth/signin" })
                    }
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Container>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {links.map((item) => (
                <NavLink key={item.link} link={item.link} title={item.label} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default NavBar;
