import { useAxios } from "@/src/hooks/useAxios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Flex,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { ImageType } from "../../FileInput/FileInput";
import CustomModalHeader from "../../Modal/CustomModalHeader";
import CreateReportForm from "../CreateReport/CreateReportForm";
import { CreateReportFormType } from "../CreateReport/CreateReportModal";
import { IReport } from "../../../../types/report";

export type EditReportModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSave: (newReport: IReport, id: number) => void;
} & IReport;

const EditReportModal = ({
  content,
  id,
  petId,
  photos,
  reportDatCreation,
  title,
  pet,
  handleClose,
  handleSave,
  isOpen,
}: EditReportModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateReportFormType>({
    defaultValues: {
      content,
      petId,
      title,
    },
  });
  const axios = useAxios();

  const [images, setImages] = React.useState<ImageType[]>(photos);

  const handleCreateReport = async (data: CreateReportFormType) => {
    const payload: IReport = {
      content: data.content,
      petId: Number(data.petId),
      title: data.title,
      photos: images.map((image) => ({
        alt: image?.alt,
        fileSize: image?.fileSize,
        fileUrl: image.fileUrl,
        title: image.title,
      })),
      id,
      reportDatCreation,
    };

    try {
      await axios.put(`/reports/${id}`, payload);
      handleSave(payload, id);
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
              Salvar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditReportModal;
