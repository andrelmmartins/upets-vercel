import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import FileInput, { ImageType } from "../../FileInput/FileInput";
import { useAxios } from "@/src/hooks/useAxios";

const CreateReportForm = ({ register, images, setImages }) => {
  const axios = useAxios();

  const [petsList, setPetsList] = React.useState([]);

  React.useEffect(() => {
    const requestPetsList = async () => {
      try {
        const { data } = await axios.get("/pets");
        setPetsList(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!petsList.length) requestPetsList();
  }, []);

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) return;

    if (images.length === 3) return;

    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const base64String = e.target?.result as string;
      const newImage: ImageType = {
        fileUrl: base64String,
        title: file.name,
        fileSize: file.size,
      };
      setImages((prev) => [...prev, newImage]);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <FormControl size="lg">
      <Flex mt={8} w="100%" flexDirection="column" gap={8}>
        <Flex flexDirection="column">
          <FormLabel>Imagem</FormLabel>
          <FileInput
            images={images}
            onChange={handleImage}
            disabled={images.length === 3}
          />
        </Flex>
        <Box>
          <FormLabel>Pet</FormLabel>
          <Select
            {...register("petId", {
              required: "Você precisa selecionar um Pet",
            })}
          >
            {petsList.map((pet: any) => (
              <option key={pet?.id} value={pet?.id}>
                {pet?.name}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <FormLabel>Titulo</FormLabel>
          <Input
            variant="outline"
            {...register("title", {
              required: "Você precisa informar um titulo",
            })}
          />
        </Box>
        <Box>
          <FormLabel>Descrição</FormLabel>
          <Textarea
            {...register("content", {
              required: "Você precisa informar uma descrição",
            })}
          />
        </Box>
      </Flex>
    </FormControl>
  );
};

export default CreateReportForm;
