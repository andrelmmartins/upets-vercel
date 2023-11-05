import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import FileInput, { ImageType } from "../FileInput/FileInput";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { usePets } from "@/src/hooks/usePets";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  age: number;
}

export default function CreatePetModal({ isOpen, onClose }: Props) {
  const { createPet } = usePets();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await createPet({
        name: data.name,
        age: parseInt(data.age.toString()),
        photos: images.map((image) => ({
          alt: image?.alt,
          fileSize: image?.fileSize,
          fileUrl: image.fileUrl,
          title: image.title,
        })),
      });
      reset();
      onClose();
      setImages([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
    setImages([]);
  };

  const [images, setImages] = useState<ImageType[]>([]);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Cadastrar Pet</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <FormLabel>Imagens do Pet</FormLabel>
            <FileInput
              images={images}
              onChange={handleImage}
              disabled={images.length >= 3}
            />
          </FormControl>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Nome do Pet</FormLabel>
            <Input
              {...register("name", { required: "Insira o nome do Pet" })}
            />
            {errors.name && (
              <FormErrorMessage>{errors.name.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.age}>
            <FormLabel>Idade do Pet (em anos)</FormLabel>
            <Input
              type="number"
              {...register("age", { required: "Insira a idade do Pet" })}
            />
            {errors.age && (
              <FormErrorMessage>{errors.age.message}</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" bg="blue" color="white">
            Cadastrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
