import { Container, Box, Stack, HStack, Heading, Text } from "@chakra-ui/react";
import Doodle from "../general/Doodle";

export default function Introduction() {
  return (
    <Box as="section" bg="black" py="4.6875rem" pos="relative">
      <Container>
        <Stack gap="4.6875rem" align="center">
          <Heading
            as="h1"
            fontSize={{ base: "3.75rem", lg: "5rem" }}
            maxW="900px"
            textAlign="center"
            color="white"
          >
            O sistema de registro de animais da UFCG <i>Campus</i> Campina
            Grande
          </Heading>
          <HStack
            gap="1.25rem"
            scrollSnapType="x mandatory"
            overflowX="scroll"
            className="no-scrollbar"
            w="full"
            maxW="77.5rem"
          >
            <Card number={0} text="Animais Cadastrados" />
            <Card number={0} text="Usuários Ativos" />
            <Card number={0} text="Animais salvos" />
          </HStack>
        </Stack>
      </Container>
      <Doodle
        variant="dog"
        w="7.5rem"
        h="6.875rem"
        left="0"
        top="7.5rem"
        pos="absolute"
        style={{
          transform: "rotate(90deg)",
        }}
      />
    </Box>
  );
}

function Card({ number, text }: { number: number; text: string }) {
  return (
    <Stack
      bg="darkgray"
      p="1.875rem"
      gap="0.9375rem"
      align="center"
      w="25rem"
      h="15.625rem"
      justify="center"
      textAlign="center"
      rounded="0.9375rem"
      scrollSnapAlign="center"
      flexShrink="0"
    >
      <Heading as="h3" fontSize="3.75rem" color="white">
        {number}
      </Heading>
      <Text fontSize="1.875rem" color="white">
        {text}
      </Text>
    </Stack>
  );
}
