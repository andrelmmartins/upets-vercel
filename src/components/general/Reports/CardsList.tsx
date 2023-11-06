import { Flex } from "@chakra-ui/react";
import React from "react";
import ReportCard from "./ReportCard/ReportCard";
import { IReport } from "@/src/types/report";

type CardListProps = {
  items: any[];
  owner?: boolean;
  deleteReport: (id: number) => void;
  editReport: (report: IReport, id: number) => void;
};

const CardsList = ({
  items,
  deleteReport,
  editReport,
  owner = false,
}: CardListProps) => {
  return (
    <Flex gap={8} mt={8} flexDirection="column">
      {items.map((item) => (
        <ReportCard
          key={item.id}
          id={item.id}
          owner={owner}
          content={item.content}
          photos={item?.photos}
          editReport={editReport}
          petId={item?.pet?.id}
          reportDatCreation={item.reportDatCreation}
          title={item.title}
          deleteReport={deleteReport}
          userEmail={item.user.email}
          userName={item.user.name}
          userPhone={item.user?.phone}
        />
      ))}
    </Flex>
  );
};

export default CardsList;
