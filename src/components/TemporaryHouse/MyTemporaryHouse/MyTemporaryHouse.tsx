import { ITemporaryHouse } from "@/src/types/temporaryHouse";
import { Box, Container } from "@chakra-ui/react";
import MyTemporaryHouseForm from "./MyTemporaryHouseForm";

export type MyTemporaryHouseProps = {
  temporaryHouse?: ITemporaryHouse;
  changeTemporaryHouse: (newData: ITemporaryHouse) => void;
  addTemporaryHouse: (newData: ITemporaryHouse) => void;
  deleteTemporaryHouse: (id: number) => void;
};

export default function MyTemporaryHouse({
  temporaryHouse,
  changeTemporaryHouse,
  addTemporaryHouse,
  deleteTemporaryHouse,
}: MyTemporaryHouseProps) {
  return (
    <Container>
      <MyTemporaryHouseForm
        temporaryHouse={temporaryHouse}
        changeTemporaryHouse={changeTemporaryHouse}
        addTemporaryHouse={addTemporaryHouse}
        deleteTemporaryHouse={deleteTemporaryHouse}
      />
    </Container>
  );
}
