import { Box, BoxProps, Heading, Stack, Text } from "@chakra-ui/react";
import Dots from "../general/Dots";
import NavigationLink from "./NavigationLink";

export default function Form({
  children,
  onSubmit,
  title,
  subtitle,
  ...boxProps
}: BoxProps & {
  title: string;
  subtitle?: string;
  children: JSX.Element;
  onSubmit: () => void;
}) {
  return (
    <Box
      border="0.625rem solid"
      borderColor="black"
      w="full"
      maxW="34.375rem"
      borderRadius="0.625rem"
      bg="white"
      {...boxProps}
    >
      <Stack
        as="form"
        p="3.125rem"
        position="relative"
        align="center"
        gap="1.875rem"
        onSubmit={onSubmit}
      >
        <Dots />

        <Stack gap="0.9375rem" mb="0.625rem">
          <Heading as="h1" size="xl" textAlign="center">
            {title}
          </Heading>

          {subtitle && (
            <Text as="h3" fontSize="xl" textAlign="center">
              {subtitle}
            </Text>
          )}
        </Stack>

        {children}
      </Stack>

      <NavigationLink />
    </Box>
  );
}
