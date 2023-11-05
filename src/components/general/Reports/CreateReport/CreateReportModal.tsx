import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import CreateReportForm from "./CreateReportForm";
import CustomModalHeader from "../../Modal/CustomModalHeader";
import { useForm } from "react-hook-form";
import { useAxios } from "@/src/hooks/useAxios";
import { ImageType } from "../../FileInput/FileInput";

export type CreateReportFormType = {
  title: string;
  content: string;
  petId: number;
};

type CreateReportModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleCreate: (newReport: any) => void;
};

const CreateReportModal = ({
  handleClose,
  isOpen,
  handleCreate,
}: CreateReportModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateReportFormType>();
  const axios = useAxios();

  const [images, setImages] = React.useState<ImageType[]>([]);

  const handleCreateReport = async (data: CreateReportFormType) => {
    const payload = {
      content: data.content,
      petId: Number(data.petId),
      title: data.title,
      photos: images.map((image) => ({
        alt: image?.alt,
        fileSize: image?.fileSize,
        fileUrl: image.fileUrl,
        title: image.title,
      })),
    };

    try {
      await axios.post("/reports", payload);
      handleCreate(payload);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    reset();
    setImages([]);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent minW="520px">
        <CustomModalHeader title="Criar Novo Reporte" onClose={handleClose} />
        <ModalBody>
          <CreateReportForm
            register={register}
            images={images}
            setImages={setImages}
          />
        </ModalBody>
        <ModalFooter>
          <Flex gap={4}>
            <Button onClick={() => resetForm()} variant="ghost">
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit(handleCreateReport)}
              backgroundColor="#636FFF"
              color="white"
              _hover={{
                backgroundColor: "#0063D1",
              }}
            >
              Criar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateReportModal;
