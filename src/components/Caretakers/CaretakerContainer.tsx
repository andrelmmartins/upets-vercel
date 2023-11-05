import { Container, Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";
import CaretakerList from "./CaretakerList";
import CaretakerPanel from "./CaretakerPanel";

export default function CaretakerContainer() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const tabContent = [<CaretakerList key={0} />, <CaretakerPanel key={1} />];

  return (
    <Container my={8}>
      <Tabs size="lg" onChange={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Cuidadores</Tab>
          <Tab>Meu Painel</Tab>
        </TabList>
        {tabContent[tabIndex]}
      </Tabs>
    </Container>
  );
}
