import { AddIcon } from "@chakra-ui/icons";
import {
  Tabs,
  Flex,
  TabList,
  Tab,
  Container,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import CustomIconButton from "../../CustomIconButton";
import CardsList from "../CardsList";
import CreateReportModal from "../CreateReport/CreateReportModal";
import FilterBar from "../FilterBar";
import React from "react";
import { useAxios } from "../../../../hooks/useAxios";
import { useSession } from "next-auth/react";
import { IReport } from "@/src/types/report";

const TabIndexes = {
  ALL: 0,
  MY_REPORTS: 1,
} as const;

export default function ReportContainer() {
  const axios = useAxios();
  const session = useSession();

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [allReports, setAllReports] = React.useState<IReport[]>([]);
  const [myReports, setMyReports] = React.useState<IReport[]>([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const getReportsRequest = async () => {
      try {
        const response = await axios.get("/reports");
        const myReports = await axios.get(`/reports/${session.data?.user.id}`);
        setAllReports(response.data);
        setMyReports(myReports.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (session.status === "authenticated") void getReportsRequest();
  }, [session]);

  const deleteReport = (id: number) => {
    setAllReports((prev) => {
      return prev.filter((report) => report.id !== id);
    });
    setMyReports((prev) => {
      return prev.filter((report) => report.id !== id);
    });
  };

  const editReport = (report: IReport, id: number) => {
    setAllReports((prev) => {
      const updatedResponse = prev.map((item) => {
        if (item.id === id) return report;
        return item;
      });
      return updatedResponse;
    });
    setMyReports((prev) => {
      const updatedResponse = prev.map((item) => {
        if (item.id === id) return report;
        return item;
      });
      return updatedResponse;
    });
  };

  return (
    <Container my={8} p={isMobile ? 2 : undefined}>
      <Tabs size="lg" onChange={(index) => setTabIndex(index)}>
        <Flex justify="space-between" alignItems="center">
          <TabList>
            <Tab>Todos</Tab>
            <Tab w="10rem">Meus Reportes</Tab>
          </TabList>
          <FilterBar value={search} onChange={setSearch} />
        </Flex>
        <CardsList
          items={tabIndex === TabIndexes.ALL ? allReports : myReports}
          owner={tabIndex === TabIndexes.MY_REPORTS}
          deleteReport={deleteReport}
          editReport={editReport}
        />
      </Tabs>
      <Box position="fixed" bottom={16} right={32}>
        <CustomIconButton
          w="60px"
          h="60px"
          size="lg"
          borderRadius="50%"
          aria-label="create report"
          onClick={() => setOpenCreateModal(true)}
          icon={<AddIcon color="white" />}
        />
      </Box>
      <CreateReportModal
        isOpen={openCreateModal}
        handleClose={() => setOpenCreateModal(false)}
        handleCreate={(newReport: any) => {
          setAllReports((prev) => [...prev, newReport]);
          setMyReports((prev) => [...prev, newReport]);
        }}
      />
    </Container>
  );
}
