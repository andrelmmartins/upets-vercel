"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Flex,
  FormErrorMessage,
  HStack,
} from "@chakra-ui/react";
import Main from "@/src/components/general/Main";
import Form from "@/src/components/auth/Form";
import PasswordToggle from "@/src/components/auth/PasswordToggle";
import { usePasswordToggle } from "@/src/hooks/usePasswordToggle";

export default function ChangePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{
    password: string;
    passwordConfirmation: string;
  }>();

  const password = watch("password");

  const [passwordType, setPasswordType] = usePasswordToggle();

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/pets",
    });
  };

  const githubLogin = async () => {
    await signIn("github", {
      redirect: true,
      callbackUrl: "/pets",
    });
  };

  return (
    <Main bg="green">
      <Flex h="full" justify="center" align="center">
        <Form
          title="Bora alterar essa senha!"
          onSubmit={handleSubmit(onSubmit)}
        >
          <>
            <HStack w="full" gap="0.625rem">
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

              <FormControl isInvalid={!!errors.passwordConfirmation}>
                <FormLabel size="lg">Confirmar Senha</FormLabel>
                <Input
                  placeholder="euamocachorro"
                  size="lg"
                  type="password"
                  {...register("passwordConfirmation", {
                    required: "Você precisa confirmar a senha",
                    validate: (value) =>
                      value === password || "Senhas diferentes",
                  })}
                />
                {errors.passwordConfirmation && (
                  <FormErrorMessage>
                    {errors.passwordConfirmation.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </HStack>

            <Button
              type="submit"
              variant="unstyled"
              bg="blue_green"
              color="white"
              size="lg"
            >
              Alterar minha senha!
            </Button>
          </>
        </Form>
      </Flex>
    </Main>
  );
}
