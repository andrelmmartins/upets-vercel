import { ITemporaryHouse } from "@/src/types/temporaryHouse";
import { Box, Flex, Heading } from "@chakra-ui/react";

export type MyTemporaryHouseInfoProps = {
  temporaryHouse: ITemporaryHouse;
};

export default function MyTemporaryHouserInfo({
  temporaryHouse,
}: MyTemporaryHouseInfoProps) {
  return (
    <Box boxShadow="base">
      <Heading>{temporaryHouse.title}</Heading>
    </Box>
  );
}
