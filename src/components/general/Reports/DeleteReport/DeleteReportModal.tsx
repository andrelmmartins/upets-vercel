import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  AlertDialogProps,
} from "@chakra-ui/react";
import React from "react";

export type DeleteReportModalProps = {
  onCofirm: () => void;
  isMobile?: boolean;
} & Omit<AlertDialogProps, "children">;

const DeleteReportModal = ({
  onCofirm,
  isOpen,
  leastDestructiveRef,
  onClose,
  isMobile,
}: DeleteReportModalProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent minWidth={isMobile ? undefined : "480px"}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Deletar Publicação
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza que deseja excluir esta publicação? Esta ação não poderá
            ser desfeita.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={leastDestructiveRef as any} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onCofirm} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteReportModal;
