import { useAxios } from "@/src/hooks/useAxios";
import { IPet } from "@/src/types/pet";
import {
  ITemporaryHouse,
  TemporaryHousePayload,
} from "@/src/types/temporaryHouse";
import { IAddress, IUser, ViaCEPResponse } from "@/src/types/user";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { MyTemporaryHouseProps } from "./MyTemporaryHouse";
import DeleteAlert from "../../general/DeleteAlert/DeleteAlert";

export type MyTemporaryHouseFormType = {
  title: string;
  description?: string;
  address: IAddress;
};

export default function MyTemporaryHouseForm({
  changeTemporaryHouse,
  temporaryHouse,
  addTemporaryHouse,
  deleteTemporaryHouse,
}: MyTemporaryHouseProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<MyTemporaryHouseFormType>({
    defaultValues: {
      description: temporaryHouse?.description || "",
      title: temporaryHouse?.title,
      address: {
        state: "PB",
        city: temporaryHouse?.address?.city,
        district: temporaryHouse?.address?.district,
        zipCode: temporaryHouse?.address?.zipCode,
        number: temporaryHouse?.address?.number,
        complement: temporaryHouse?.address?.complement,
        street: temporaryHouse?.address?.street,
      },
    },
  });
  const session = useSession();
  const axios = useAxios();
  const cancelRef = React.useRef(null);

  const initialSelectedPets = temporaryHouse?.pets.length
    ? temporaryHouse?.pets.map((pet) => pet.id)
    : [];

  const [petsList, setPetsList] = React.useState<IPet[]>([]);
  const [careTakersList, setCareTakersList] = React.useState<IUser[]>([]);
  const [selectedPets, setSelectedPets] =
    React.useState<number[]>(initialSelectedPets);
  const [selectedCareTakers, setSelectedCareTakers] = React.useState<number[]>(
    []
  );
  const [showDeleteModal, setShowDeletemodal] = React.useState(false);

  const filteredPets = petsList.filter((pet) => !selectedPets.includes(pet.id));
  const filteredCareTakers = careTakersList.filter(
    (caretaker) => !selectedCareTakers.includes(caretaker.id)
  );

  const requestCreateTemporaryHouse = async (
    data: MyTemporaryHouseFormType
  ) => {
    const payload: TemporaryHousePayload = {
      address: {
        city: data.address.city,
        district: data.address.district,
        number: data.address.number,
        state: "PB",
        street: data.address.street,
        zipCode: data.address.zipCode,
        complement: data.address?.complement,
      },
      careTakerIds: selectedCareTakers,
      pets: selectedPets,
      title: data.title,
      description: data.description,
    };

    try {
      const response = await axios.post<ITemporaryHouse>(
        "/temporary-house/create",
        payload
      );
      console.log(response);
      addTemporaryHouse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const requestSaveTemporaryHouse = async (data: MyTemporaryHouseFormType) => {
    if (!temporaryHouse) return;
    const payload: TemporaryHousePayload = {
      address: {
        city: data.address.city,
        district: data.address.district,
        number: data.address.number,
        state: "PB",
        street: data.address.street,
        zipCode: data.address.zipCode,
        complement: data.address?.complement,
      },
      careTakerIds: selectedCareTakers,
      pets: selectedPets,
      title: data.title,
      description: data.description,
    };

    try {
      await axios.patch<ITemporaryHouse>(
        `/temporary-house/edit/${temporaryHouse?.id}`,
        payload
      );
      changeTemporaryHouse({
        ...temporaryHouse,
        address: payload.address,
        careTakers: careTakersList.filter(
          (caretaker) => !selectedCareTakers.includes(caretaker.id)
        ),
        pets: petsList.filter((pet) => !selectedPets.includes(pet.id)),
        description: payload.description,
        title: payload.title,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const zipCode = watch("address.zipCode");

  React.useEffect(() => {
    const requestAdrress = async () => {
      try {
        const zipCodeValue = zipCode.slice(0, 5) + "-" + zipCode.slice(5);
        const response = await fetch(
          `https://viacep.com.br/ws/${zipCodeValue}/json/`,
          {
            method: "GET",
          }
        );
        const data = (await response.json()) as ViaCEPResponse;
        if (data) {
          setValue("address.city", data.localidade);
          setValue("address.complement", data.complemento);
          setValue("address.district", data.bairro);
          setValue("address.street", data.logradouro);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (zipCode?.length === 8) requestAdrress();
  }, [zipCode]);

  React.useEffect(() => {
    const requestPetsList = async () => {
      try {
        const { data } = await axios.get<IPet[]>("/pets");
        setPetsList(data);
      } catch (error) {
        console.log(error);
      }
    };

    const requestCareTakerList = async () => {
      try {
        const { data } = await axios.get<IUser[]>("/user/caretakers");
        setCareTakersList(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (session.status === "authenticated") {
      if (!petsList.length) requestPetsList();
      if (!careTakersList.length) requestCareTakerList();
    }
  }, [session]);

  const handleSelectPet = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedPets((prev) => [...prev, Number(value)]);
  };

  const handleRemoveSelectedPet = (id: number) => {
    const updatedSelection = selectedPets.filter((selected) => selected !== id);
    setSelectedPets(updatedSelection);
  };

  const handleSelectCareTaker = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedCareTakers((prev) => [...prev, Number(value)]);
  };

  const handleRemoveSelectedCareTaker = (id: number) => {
    const updatedSelection = selectedCareTakers.filter(
      (selected) => selected !== id
    );
    setSelectedCareTakers(updatedSelection);
  };

  const handleDeleteTemporaryHouse = async () => {
    if (!temporaryHouse) return;
    try {
      await axios.delete(`/temporary-house/${temporaryHouse?.id}`);
      deleteTemporaryHouse(temporaryHouse.id);
      resetForm();
      setShowDeletemodal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setValue("address.city", "");
    setValue("address.complement", "");
    setValue("address.district", "");
    setValue("address.number", "");
    setValue("address.street", "");
    setValue("address.zipCode", "");
    setValue("title", "");
    setValue("description", "");
    setSelectedPets([]);
    setSelectedCareTakers([]);
  };

  const isInvalid = Object.values(errors).length > 0;

  return (
    <>
      <Box p={8} boxShadow="base">
        <Heading mb={8}>
          {temporaryHouse ? "Editar" : "Criar"} Lar Temporário
        </Heading>
        <FormControl
          size="lg"
          onSubmit={handleSubmit(requestCreateTemporaryHouse)}
          isInvalid={isInvalid}
        >
          <Box mb={4}>
            <FormLabel>Nome</FormLabel>
            <Input
              isInvalid={!!errors?.title}
              {...register("title", {
                required: "É necessário informar um nome para o lar temporário",
              })}
              variant="outline"
            />
            {errors?.title && (
              <FormErrorMessage>{errors.title.message}</FormErrorMessage>
            )}
          </Box>
          <Box>
            <FormLabel>Descrição</FormLabel>
            <Textarea isInvalid={false} {...register("description")} />
          </Box>
          <Flex gap={4} my={4}>
            <Box w="30%">
              <FormLabel>Estado</FormLabel>
              <Input
                isInvalid={false}
                {...register("address.state", {
                  disabled: true,
                })}
              />
            </Box>
            <Box w="60%">
              <FormLabel>CEP</FormLabel>
              <Input
                isInvalid={!!errors?.address?.zipCode}
                {...register("address.zipCode", {
                  required: "É necessário informar um CEP",
                  pattern: {
                    value: /(\d{8})/gm,
                    message: "É precisa informar um CEP válido",
                  },
                })}
                variant="outline"
              />
              {errors?.address?.zipCode && (
                <FormErrorMessage>
                  {errors.address?.zipCode.message}
                </FormErrorMessage>
              )}
            </Box>
            <Box w="100%">
              <FormLabel>Cidade</FormLabel>
              <Input
                isInvalid={!!errors?.address?.city}
                {...register("address.city", {
                  required: "É necessário informar uma cidade",
                })}
                variant="outline"
              />
              {errors?.address?.city && (
                <FormErrorMessage>
                  {errors.address?.city.message}
                </FormErrorMessage>
              )}
            </Box>
          </Flex>
          <Flex gap={4} mb={4}>
            <Box w="60%">
              <FormLabel>Bairro</FormLabel>
              <Input
                isInvalid={!!errors?.address?.district}
                {...register("address.district", {
                  required: "É necessário informar um bairro",
                })}
                variant="outline"
              />
              {errors?.address?.district && (
                <FormErrorMessage>
                  {errors.address?.district.message}
                </FormErrorMessage>
              )}
            </Box>
            <Box w="100%">
              <FormLabel>Rua</FormLabel>
              <Input
                isInvalid={!!errors?.address?.street}
                {...register("address.street", {
                  required: "É necessário informar a rua",
                })}
                variant="outline"
              />
              {errors?.address?.street && (
                <FormErrorMessage>
                  {errors.address?.street.message}
                </FormErrorMessage>
              )}
            </Box>
            <Box>
              <FormLabel>Número</FormLabel>
              <Input
                isInvalid={!!errors?.address?.number}
                {...register("address.number", {
                  required: "É necessário informar o número",
                })}
                variant="outline"
              />
              {errors?.address?.number && (
                <FormErrorMessage>
                  {errors.address?.number.message}
                </FormErrorMessage>
              )}
            </Box>
          </Flex>
          <Box mb={4}>
            <FormLabel>Complemento</FormLabel>
            <Input
              isInvalid={false}
              {...register("address.complement")}
              variant="outline"
            />
          </Box>
          <Box mb={4}>
            <FormLabel>Pets</FormLabel>
            <Select isInvalid={false} onChange={handleSelectPet}>
              <option value=""></option>
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
          <Box mb={8}>
            <FormLabel>Cuidadores</FormLabel>
            <Select isInvalid={false} onChange={handleSelectCareTaker}>
              <option value=""></option>
              {filteredCareTakers.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </Select>
            <Flex mt={2} gap={2}>
              {selectedCareTakers.map((selectedCaretaker) => (
                <Badge
                  px={2}
                  colorScheme="purple"
                  key={selectedCaretaker}
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleRemoveSelectedCareTaker(selectedCaretaker)
                  }
                >
                  <Flex gap={2} align="center" lineHeight={2}>
                    {
                      careTakersList.find(
                        (caretaker) => caretaker.id === selectedCaretaker
                      )?.name
                    }
                    <Divider orientation="vertical" />
                    <CloseIcon w="6px" />
                  </Flex>
                </Badge>
              ))}
            </Flex>
          </Box>
          <Divider mb={8} />
          <Flex justify="end" gap={8}>
            {temporaryHouse ? (
              <>
                <Button
                  onClick={() => setShowDeletemodal(true)}
                  colorScheme="red"
                >
                  Deletar
                </Button>
                <Button
                  onClick={handleSubmit(requestSaveTemporaryHouse)}
                  type="submit"
                  color="white"
                  backgroundColor="#636FFF"
                  _hover={{ backgroundColor: "#0063D1" }}
                >
                  Salvar
                </Button>
              </>
            ) : (
              <Button
                onClick={handleSubmit(requestCreateTemporaryHouse)}
                type="submit"
                color="white"
                backgroundColor="#636FFF"
                _hover={{ backgroundColor: "#0063D1" }}
              >
                Criar
              </Button>
            )}
          </Flex>
        </FormControl>
      </Box>
      <DeleteAlert
        onCofirm={() => handleDeleteTemporaryHouse()}
        isOpen={showDeleteModal}
        onClose={() => setShowDeletemodal(false)}
        leastDestructiveRef={cancelRef}
        // isMobile={isMobile}
        content="Tem certeza que deseja excluir este lar temporario? Esta ação não poderá
        ser desfeita."
        title="Deletar Lar Temporario"
      />
    </>
  );
}
