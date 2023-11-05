import { Stack, Text, Image } from "@chakra-ui/react";

import { Pet } from "@/src/models/Pet";

export default function Card({ pet }: { pet: Pet }) {
  const { name, age, photos } = pet;
  return (
    <Stack
      border="0.1875rem solid"
      borderColor="black"
      boxShadow="-0.25rem 0.25rem 0 0 black"
      rounded="0.4375rem"
      gap="0.9375rem"
      w="21.25rem"
      p="1.25rem"
    >
      <Image
        src={photos[0]?.fileUrl ?? ""}
        alt={`Imagem do Pet: ${name}`}
        h="25rem"
        w="18.75rem"
        rounded="md"
        __css={{ objectFit: "cover" }}
      />
      <Text fontSize="1.875rem" fontWeight="bold">
        {name}
      </Text>
      <Text
        w="fit-content"
        color="blue"
        rounded="full"
        border="2px"
        borderColor="blue"
        px="1rem"
        py="0.5rem"
        lineHeight="none"
        fontWeight="bold"
        fontSize="md"
      >
        {age} {age === 1 ? "ano" : "anos"}
      </Text>
    </Stack>
  );
}
