"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
} from "@chakra-ui/react";
import Main from "@/src/components/general/Main";
import Form from "@/src/components/auth/Form";

export default function ForgotPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
    });
  };

  return (
    <Main bg="orange">
      <Flex h="full" justify="center" align="center">
        <Form
          title="Xiii esqueceu?"
          subtitle="Vamos te mandar um e-mail para você recuperar o acesso!"
          onSubmit={handleSubmit(onSubmit)}
        >
          <>
            <FormControl w="full" isInvalid={!!errors.email}>
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

            <Button
              type="submit"
              variant="unstyled"
              bg="pink"
              color="white"
              size="lg"
            >
              Solicitar Recuperação!
            </Button>
          </>
        </Form>
      </Flex>
    </Main>
  );
}
