import CareTakersPage from "@/app/temporaryHouses/page";
import { IPet } from "@/src/types/pet";
import { IUser } from "@/src/types/user";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

export type TemporaryHouseItemProps = {
  title: string;
  careTakers: IUser[];
  ownerId: number;
  pets: IPet[];
  description?: string;
};

export default function TemporaryHouseItem({
  title,
  description,
  pets,
  careTakers,
  ownerId,
}: TemporaryHouseItemProps) {
  const owner = careTakers.find((owner) => owner.id === ownerId);

  return (
    <Box borderRadius="base" shadow="base">
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Flex w="100%" justify="space-between" align="center">
              <Heading>{title}</Heading>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Popover>
              <PopoverTrigger>
                <Badge
                  py={2}
                  px={2}
                  variant="solid"
                  letterSpacing={2}
                  colorScheme="blackAlpha"
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "rgba(0, 0, 0, .7)",
                  }}
                >
                  Responsável
                </Badge>
              </PopoverTrigger>
              <PopoverContent minWidth="220px">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody width="max-content">
                  <Flex gap={2} flexDir="column" textAlign="left">
                    <Text fontSize="lg">Nome: {owner?.name}</Text>
                    <Text fontSize="lg">Email: {owner?.email}</Text>
                    {owner?.phone ? (
                      <Text fontSize="lg">Telefone: {owner?.phone}</Text>
                    ) : null}
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Box>
              {description ? (
                <Box py={4} borderBottom="1px solid rgba(0, 0, 0, .2)">
                  <Text as="sub" fontSize="1.25rem" color="#838383">
                    {description}
                  </Text>
                </Box>
              ) : null}
              <Flex mt={4}>
                {pets?.map((pet) => (
                  <Badge
                    key={pet.id}
                    colorScheme="purple"
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    {pet.name} - Idade: {pet.age}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
