import { IconButtonProps, IconButton } from "@chakra-ui/react";
import React from "react";

interface CustomIconButtonProps extends IconButtonProps {}

const CustomIconButton = (props: CustomIconButtonProps) => {
  return (
    <IconButton
      {...props}
      color="white"
      backgroundColor="#636FFF"
      _hover={{ backgroundColor: "#0063D1" }}
    />
  );
};

export default CustomIconButton;
