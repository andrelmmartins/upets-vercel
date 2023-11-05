import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Grid,
  Text,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

import Carousel from "../../ImageSlider/Carousel";
import { useAxios } from "@/src/hooks/useAxios";
import MobileReportCard from "./MobileReportCard";
import EditReportModal from "../EditReport/EditReportModal";
import { IReport } from "@/src/types/report";
import DeleteAlert from "../../DeleteAlert/DeleteAlert";

export type ReportCardProps = {
  owner: boolean;
  deleteReport: (id: number) => void;
  editReport: (report: IReport, id: number) => void;
} & IReport;

const ReportCard = ({
  owner,
  content,
  photos,
  title,
  id,
  deleteReport,
  editReport,
  petId,
  reportDatCreation,
}: ReportCardProps) => {
  const cancelRef = React.useRef(null);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const axios = useAxios();

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);

  const handleDeleteReport = async () => {
    try {
      await axios.delete(`reports/${id}`);
      deleteReport(id);
      setDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex flexDir="column">
      {owner && (
        <Flex gap={1} w="fit-content" borderRadius={8} boxShadow="inner">
          <IconButton
            size="lg"
            colorScheme="facebook"
            variant="ghost"
            aria-label="edit"
            onClick={() => setEditModalOpen(true)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="lg"
            colorScheme="red"
            variant="ghost"
            aria-label="delete"
            onClick={() => setDeleteModalOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
        </Flex>
      )}
      {isMobile ? (
        <MobileReportCard
          content={content}
          id={id}
          photos={photos}
          title={title}
          petId={petId}
          reportDatCreation={reportDatCreation}
        />
      ) : (
        <Box p={8} borderRadius={8} boxShadow="base">
          <Grid
            templateColumns={photos.length && !isMobile ? "220px 1fr" : "1fr"}
          >
            {photos.length ? (
              <Flex w="100%" justifyContent="center" alignItems="center">
                <Carousel
                  images={photos}
                  width={isMobile ? "100%" : 220}
                  height={140}
                />
              </Flex>
            ) : null}
            <Box px={12}>
              <Flex
                w="100%"
                justifyContent="space-between"
                mb={8}
                alignItems="center"
              >
                <Heading as="h5" size="md">
                  {title}
                </Heading>
                <Avatar src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9" />
              </Flex>
              <Box>
                <Text as="sub" fontSize="1.25rem" color="#838383">
                  {content}
                </Text>
              </Box>
            </Box>
          </Grid>
        </Box>
      )}

      <DeleteAlert
        onCofirm={handleDeleteReport}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        leastDestructiveRef={cancelRef}
        isMobile={isMobile}
        content="Tem certeza que deseja excluir esta publicação? Esta ação não poderá
        ser desfeita."
        title="Deletar Publicação"
      />

      <EditReportModal
        content={content}
        handleClose={() => setEditModalOpen(false)}
        handleSave={editReport}
        id={id}
        isOpen={editModalOpen}
        petId={petId}
        photos={photos}
        reportDatCreation={reportDatCreation}
        title={title}
      />
    </Flex>
  );
};

export default ReportCard;
