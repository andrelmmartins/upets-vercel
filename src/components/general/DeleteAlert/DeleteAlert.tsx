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
  title: string;
  content: string;
} & Omit<AlertDialogProps, "children">;

const DeleteAlert = ({
  onCofirm,
  isOpen,
  leastDestructiveRef,
  onClose,
  isMobile,
  title,
  content,
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
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{content}</AlertDialogBody>

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

export default DeleteAlert;
