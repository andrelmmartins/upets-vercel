import { IPet } from "@/src/types/pet";
import { Badge, Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";

export type CareTakerItemProps = {
  name: string;
  email: string;
  phone?: string;
  pets: IPet[];
};

export default function CaretakerItem({
  email,
  name,
  pets,
  phone,
}: CareTakerItemProps) {
  return (
    <Box p={8} boxShadow="base">
      <Flex justify="space-between" align="center">
        <Heading as="h4" size="md">
          {name}
        </Heading>
        <Flex flexDir="column">
          <Text>{email}</Text>
          <Text>{phone}</Text>
        </Flex>
      </Flex>
      <Divider />
      <Heading as="h4" size="md">
        Pets
      </Heading>
      {pets.map((pet) => (
        <Badge px={2} colorScheme="purple" borderRadius="full" key={pet.id}>
          {pet.name} ({pet.age} anos)
        </Badge>
      ))}
    </Box>
  );
}
