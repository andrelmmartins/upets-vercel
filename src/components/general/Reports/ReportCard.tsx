import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Grid,
  Text,
  IconButton,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export type ReportCardProps = {
  owner: boolean;
};

const ReportCard = ({ owner }: ReportCardProps) => {
  return (
    <Flex flexDir="column">
      {owner && (
        <Flex gap={1} w="fit-content" borderRadius={8} boxShadow="inner">
          <IconButton
            size="lg"
            colorScheme="facebook"
            variant="ghost"
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="lg"
            colorScheme="red"
            variant="ghost"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Flex>
      )}
      <Box p={8} borderRadius={8} boxShadow="base">
        <Grid templateColumns="160px 1fr">
          <Flex
            w="100%"
            height="10rem"
            justifyContent="center"
            alignItems="center"
          >
            <Image alt="placeholder" src="logo.svg" width={120} height={160} />
          </Flex>
          <Box px={12}>
            <Flex
              w="100%"
              justifyContent="space-between"
              mb={8}
              alignItems="center"
            >
              <Heading as="h5" size="md">
                Report title here long text
              </Heading>
              <Avatar src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9" />
            </Flex>
            <Box>
              <Text as="sub" fontSize="1.25rem" color="#838383">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
                sit quas soluta tempore et unde iusto excepturi quibusdam?
                Exercitationem doloribus, saepe ipsa ullam quod veniam facere
                nemo ad. Quia, expedita. Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Maiores, unde! Molestiae, non. Porro nostrum
                voluptas quibusdam cum accusamus illum, eum, veritatis
                recusandae, debitis adipisci excepturi deleniti velit nam dolor
                doloribus? Lorem ipsum dolor sit amet consectetur, adipisicing
                elit. Quam sit quas soluta tempore et unde iusto excepturi
                quibusdam? Exercitationem doloribus, saepe ipsa ullam quod
                veniam facere nemo ad. Quia, expedita. Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Maiores, unde! Molestiae,
                non. Porro nostrum voluptas quibusdam cum accusamus illum, eum,
                veritatis recusandae, debitis adipisci excepturi deleniti velit
                nam dolor doloribus?
              </Text>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Flex>
  );
};

export default ReportCard;
