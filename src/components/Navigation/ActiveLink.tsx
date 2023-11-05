import { Box, useColorModeValue } from "@chakra-ui/react";

type ActiveLinkProps = {
  title: string;
};

function ActiveLink({ title }: ActiveLinkProps) {
  return (
    <Box
      px={4}
      py={1}
      textTransform="uppercase"
      fontWeight={600}
      letterSpacing=".1em"
      fontSize="1rem"
      color="white"
      borderBottom="1px solid #FFA23B"
      _hover={{
        cursor: "default",
      }}
    >
      {title}
    </Box>
  );
}

export default ActiveLink;
