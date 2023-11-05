import { useAxios } from "@/src/hooks/useAxios";
import { IPet } from "@/src/types/pet";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Select,
  Switch,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";

export default function CaretakerPanel() {
  const axios = useAxios();
  const session = useSession();

  const [selectedPets, setSelectedPets] = React.useState<number[]>([]);
  const [petsList, setPetsList] = React.useState<IPet[]>([]);
  const [isCareTaker, setIsCareTaker] = React.useState(false);

  const filteredPets = petsList.filter((pet) => !selectedPets.includes(pet.id));

  React.useEffect(() => {
    const requestUserInfo = async () => {
      try {
        const { data } = await axios.get(`/user/${session.data?.user.id}`);
        setSelectedPets(data.caretakingPets.map((pet) => pet.id));
        setIsCareTaker(data.isCareTaker || false);
      } catch (error) {
        console.log(error);
      }
    };

    const requestPetsList = async () => {
      try {
        const { data } = await axios.get<IPet[]>("/pets");
        setPetsList(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!petsList.length && session.status === "authenticated") {
      requestPetsList();
      requestUserInfo();
    }
  }, [session]);

  const handleRemoveSelectedPet = (id: number) => {
    const updatedSelection = selectedPets.filter((selected) => selected !== id);
    setSelectedPets(updatedSelection);
  };

  const handleSaveCareTaker = async () => {
    try {
      const payload = {
        isCareTaker,
        pets: selectedPets,
      };
      await axios.patch(
        `/user/${session.data?.user.id}/set-caretaker-role`,
        payload
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box boxShadow="base" p={8}>
      <Heading as="h4" size="lg">
        Meu Painel
      </Heading>
      <Divider my={4} />
      <Flex align="center">
        <FormLabel htmlFor="caretaker-active" mb="0">
          Cuidador Ativo
        </FormLabel>
        <Switch
          isChecked={isCareTaker}
          onChange={(e) => setIsCareTaker(e.target.checked)}
          id="caretaker-active"
          size="lg"
        />
      </Flex>
      {isCareTaker ? (
        <Box mt={4}>
          <FormLabel>Pets sob meus cuidados</FormLabel>
          <Select
            onChange={(e) =>
              setSelectedPets((prev) => [...prev, Number(e.target.value)])
            }
          >
            <option></option>
            {filteredPets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name} ({pet.age} anos)
              </option>
            ))}
          </Select>
          <Flex mt={2} gap={2}>
            {selectedPets.map((selectedPet) => (
              <Badge
                px={2}
                colorScheme="purple"
                key={selectedPet}
                _hover={{
                  cursor: "pointer",
                }}
                onClick={() => handleRemoveSelectedPet(selectedPet)}
              >
                <Flex gap={2} align="center" lineHeight={2}>
                  {petsList.find((pet) => pet.id === selectedPet)?.name}
                  <Divider orientation="vertical" />
                  <CloseIcon w="6px" />
                </Flex>
              </Badge>
            ))}
          </Flex>
        </Box>
      ) : null}
      <Flex mt={8} justify="end">
        <Button
          color="white"
          backgroundColor="#636FFF"
          _hover={{ backgroundColor: "#0063D1" }}
          onClick={() => handleSaveCareTaker()}
        >
          Salvar
        </Button>
      </Flex>
    </Box>
  );
}
