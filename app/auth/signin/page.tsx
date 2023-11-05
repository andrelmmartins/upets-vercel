"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  Flex,
  FormErrorMessage,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import Main from "@/src/components/general/Main";
import Form from "@/src/components/auth/Form";
import AuthProvidersButtons from "@/src/components/auth/AuthProvidersButtons";
import { usePasswordToggle } from "@/src/hooks/usePasswordToggle";
import PasswordToggle from "@/src/components/auth/PasswordToggle";
import { useAxios } from "@/src/hooks/useAxios";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const { status } = useSession();
  const router = useRouter();
  const axios = useAxios();

  const [passwordType, setPasswordType] = usePasswordToggle();

  if (status === "loading") {
    return (
      <Flex w="100%" h="100%" justify="center" align="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (status === "authenticated") {
    router?.push("/home");
  }

  const onSubmit = async (data) => {
    const response = await axios.post("/auth/signin", {
      email: data.email,
      password: data.password,
    });

    if (response.status === 200)
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/home",
      });
  };

  const githubLogin = async () => {
    await signIn("github", {
      redirect: true,
      callbackUrl: "/pets",
    });
  };

  return (
    <Main bg="blue">
      <Flex h="full" justify="center" align="center">
        <Form title="Acesse o UPets" onSubmit={handleSubmit(onSubmit)}>
          <>
            <Stack w="full" gap="0.4375rem">
              <FormControl isInvalid={!!errors.email}>
                <FormLabel size="lg">E-mail</FormLabel>
                <Input
                  placeholder="gatinho@upets.com"
                  type="email"
                  size="lg"
                  {...register("email", {
                    required: "Você precisa passar um e-mail",
                    pattern: {
                      value: /^[\w\.-]+@[\w\.-]+\.\w+$/,
                      message: "E-mail inválido",
                    },
                  })}
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel size="lg">Senha</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="euamocachorro"
                    size="lg"
                    type={passwordType}
                    pr="2.5rem"
                    {...register("password", {
                      required: "Você precisa passar um senha",
                    })}
                  />
                  <PasswordToggle
                    type={passwordType}
                    setType={setPasswordType}
                  />
                </InputGroup>
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>

              <Link
                href="/auth/forgot"
                textAlign="right"
                fontSize="1rem"
                alignSelf="end"
                w="min-content"
              >
                Esqueceu?
              </Link>
            </Stack>

            <Stack gap="0.4375rem" w="full">
              <Button
                type="submit"
                variant="unstyled"
                bg="orange"
                color="white"
                size="lg"
              >
                Entrar!
              </Button>
              <HStack gap="0.4375rem" h="2.1875rem">
                <AuthProvidersButtons authWithGithub={githubLogin} />
              </HStack>
            </Stack>
          </>
        </Form>
      </Flex>
    </Main>
  );
}
