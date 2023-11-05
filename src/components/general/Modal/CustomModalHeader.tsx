import { CloseIcon } from "@chakra-ui/icons";
import { Flex, Grid, IconButton } from "@chakra-ui/react";
import React from "react";

type ModalHeaderProps = {
  title?: string;
  onClose: () => void;
};

const CustomModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <Grid
      borderRadius="0.375rem 0.375rem 0 0"
      px={4}
      py={2}
      backgroundColor="#636FFF"
      templateColumns="1fr 2.5rem"
    >
      <Flex fontWeight={600} color="white" justifyContent="center">
        {title}
      </Flex>
      <IconButton
        background="black"
        onClick={onClose}
        aria-label="close"
        _hover={{
          backgroundColor: "black",
        }}
        icon={<CloseIcon color="white" />}
      />
    </Grid>
  );
};

export default CustomModalHeader;
