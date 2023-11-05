import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Carousel from "../../ImageSlider/Carousel";
import { ImageType } from "../../FileInput/FileInput";
import { IReport } from "@/src/types/report";

export type MobileReportCardProps = {} & IReport;

const MobileReportCard = ({
  content,
  photos,
  title,
}: MobileReportCardProps) => {
  return (
    <Box p={4} boxShadow="base">
      <Flex w="100%" justify="space-between" align="center">
        <Heading as="h5" size="md">
          {title}
        </Heading>
        <Avatar src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9" />
      </Flex>
      {photos.length ? (
        <Flex w="100%" justifyContent="center" alignItems="center" mt={8}>
          <Carousel images={photos} width="100%" height={140} />
        </Flex>
      ) : null}
      <Box mt={6} pb={6}>
        <Text as="sub" fontSize="1.25rem" color="#838383">
          {content}
        </Text>
      </Box>
    </Box>
  );
};

export default MobileReportCard;
