"use client";

import React, { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, useBoolean } from "@chakra-ui/react";

import { usePets } from "@/src/hooks/usePets";
import NavBar from "@/src/components/Navigation/NavBar";
import Card from "@/src/components/general/pet/Card";
import CustomIconButton from "@/src/components/general/CustomIconButton";
import CreatePetModal from "@/src/components/general/pet/CreatePetModal";
import { Pet } from "@/src/models/Pet";
import PetDetailsModal from "@/src/components/general/pet/PetDetailsModal";
import FilterBar from "@/src/components/general/Reports/FilterBar";

function PetsPage() {
  const { pets } = usePets();

  const [modalIsOpen, setModalStatus] = useBoolean();
  const [selectedPet, setSelectedPet] = useState<Pet>();

  const [search, setSearch] = useState("");

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <Container py="3rem" display="flex" flexDir="column" gap="3rem">
        <Flex justify="space-between" alignItems="center">
          <FilterBar value={search} onChange={setSearch} />
        </Flex>

        {filteredPets.length === 0 ? (
          <Flex py="3rem" justify="center">
            Não encontramos nenhum Pet
          </Flex>
        ) : (
          <Flex as="ul" flexWrap="wrap" gap="2rem">
            {filteredPets.map((pet, index) => (
              <Box
                as="li"
                key={`pet-${index}`}
                cursor="pointer"
                onClick={() => {
                  setSelectedPet(pet);
                  setModalStatus.on();
                }}
              >
                <Card pet={pet} />
              </Box>
            ))}
          </Flex>
        )}

        <Box position="fixed" bottom={16} right={32}>
          <CustomIconButton
            w="60px"
            h="60px"
            size="lg"
            borderRadius="50%"
            aria-label="create report"
            onClick={setModalStatus.on}
            icon={<AddIcon color="white" />}
          />
        </Box>

        {!selectedPet && (
          <CreatePetModal isOpen={modalIsOpen} onClose={setModalStatus.off} />
        )}

        {selectedPet && (
          <PetDetailsModal
            isOpen={modalIsOpen}
            onClose={() => {
              setModalStatus.off();
              setSelectedPet(undefined);
            }}
            pet={selectedPet}
          />
        )}
      </Container>
    </>
  );
}

export default PetsPage;
