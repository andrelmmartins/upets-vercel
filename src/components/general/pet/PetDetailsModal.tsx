import { Pet } from "@/src/models/Pet";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Carousel from "../ImageSlider/Carousel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pet: Pet;
}

export default function PetDetailsModal({ isOpen, onClose, pet }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalhes do Pet</ModalHeader>
        <ModalCloseButton />

        <ModalBody display="flex" flexDir="column" gap="3rem">
          <Carousel images={pet.photos} />
          <Text fontSize="1.875rem" fontWeight="bold">
            {pet.name}
          </Text>
          <Text
            w="fit-content"
            color="blue"
            rounded="full"
            border="2px"
            borderColor="blue"
            px="1rem"
            py="0.5rem"
            lineHeight="none"
            fontWeight="bold"
            fontSize="md"
          >
            {pet.age} {pet.age === 1 ? "ano" : "anos"}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
