import { Box, Flex, Heading, Stack } from "@chakra-ui/react";

import Card from "../general/pet/Card";
import Doodle from "../general/Doodle";
import { Pet } from "@/src/models/Pet";

export default function OurPets() {
  const pets: Pet[] = [
    new Pet({
      name: "Batman",
      age: 1,
      photos: [
        {
          title: "Imagem de Batman",
          fileUrl:
            "https://royalpets.vteximg.com.br/arquivos/ids/244396/banner-vira-lata-saude-mobile.png?v=637848514948330000",
        },
      ],
    }),
    new Pet({
      name: "Chico",
      age: 2,
      photos: [
        {
          title: "Imagem de Chico",
          fileUrl:
            "https://images.unsplash.com/photo-1629555256341-09e5e9871647?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
        },
      ],
    }),
    new Pet({
      name: "Minerva",
      age: 1,
      photos: [
        {
          title: "Imagem de Minerva",
          fileUrl:
            "https://image.cachorrogato.com.br/textimages/gato-vira-lata.jpg",
        },
      ],
    }),
    new Pet({
      name: "Leão",
      age: 5,
      photos: [
        {
          title: "Imagem de Leão",
          fileUrl:
            "https://media.gazetadopovo.com.br/viver-bem/2017/02/vira_latacorrendo-600x400-86d7fa10.jpg",
        },
      ],
    }),
    new Pet({
      name: "Bolinha",
      age: 2,
      photos: [
        {
          title: "Imagem de Bolinha",
          fileUrl:
            "https://www.pedigree.com.br/sites/g/files/fnmzdf2401/files/2023-06/vira-lata-large.png",
        },
      ],
    }),
    new Pet({
      name: "Gata",
      age: 3,
      photos: [
        {
          title: "Imagem de Gata",
          fileUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfMcaGCPUt62Bjl7KYBfJ8ymEA0PTlbf4KiA&usqp=CAU",
        },
      ],
    }),
  ];

  return (
    <Stack py="6.25rem" bg="white" gap="3.125rem" pos="relative">
      <Heading as="h2" fontSize="1.875rem" textAlign="center">
        Nossos Queridos
      </Heading>
      <Flex
        as="ul"
        scrollSnapType="x mandatory"
        overflowX="scroll"
        className="no-scrollbar"
        pb="0.25rem"
      >
        {pets.map((pet, index) => {
          const isLast = index === pets.length - 1;

          return (
            <Box
              as="li"
              key={`outpets-pet-${index}`}
              scrollSnapAlign="center"
              pl="1.25rem"
              pr={isLast ? "1.25rem" : "0"}
            >
              <Card pet={pet} />
            </Box>
          );
        })}
      </Flex>
      <Doodle
        variant="dog"
        w="7.5rem"
        h="6.875rem"
        right="0"
        top="7.5rem"
        pos="absolute"
        style={{
          transform: "rotate(-90deg)",
        }}
      />
    </Stack>
  );
}
