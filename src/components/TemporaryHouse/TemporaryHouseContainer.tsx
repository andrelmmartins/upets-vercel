import { Box, Flex, Grid, useMediaQuery } from "@chakra-ui/react";
import TemporaryHouseList from "./TemporaryHouseList";
import React from "react";
import MyTemporaryHouse from "./MyTemporaryHouse/MyTemporaryHouse";
import { useAxios } from "@/src/hooks/useAxios";
import { ITemporaryHouse } from "@/src/types/temporaryHouse";
import { useSession } from "next-auth/react";

export default function TemporaryHouseContainer() {
  const [selectedOption, setSelectedOption] = React.useState(0);

  const axios = useAxios();
  const session = useSession();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const [temporaryHouses, setTemporaryHouses] = React.useState<
    ITemporaryHouse[]
  >([]);
  const [userTemporaryHouse, setUserTemporaryHouse] =
    React.useState<ITemporaryHouse>();

  const options = [
    {
      value: 0,
      label: "Todos",
      content: <TemporaryHouseList temporaryHouses={temporaryHouses} />,
    },
    {
      value: 1,
      label: "Meu Lar Temporario",
      content: (
        <MyTemporaryHouse
          addTemporaryHouse={(newData) => {
            setUserTemporaryHouse(newData);
            setTemporaryHouses((prev) => [...prev, newData]);
          }}
          changeTemporaryHouse={(updatedData) => {
            setUserTemporaryHouse(updatedData);
            setTemporaryHouses((prev) => {
              return prev.map((tempHouse) => {
                if (tempHouse.id === updatedData.id) return updatedData;
                return tempHouse;
              });
            });
          }}
          deleteTemporaryHouse={(id) => {
            setUserTemporaryHouse(undefined);
            setTemporaryHouses((prev) =>
              prev.filter((house) => house.id !== id)
            );
          }}
          temporaryHouse={userTemporaryHouse}
        />
      ),
    },
  ];

  React.useEffect(() => {
    const getTemporaryHouses = async () => {
      try {
        const { data } = await axios.get<ITemporaryHouse[]>("/temporary-house");
        const filteredTempororaryHouse = data.find(
          (house) => house.ownerId === Number(session?.data?.user?.id)
        );
        setTemporaryHouses(data);
        if (filteredTempororaryHouse)
          setUserTemporaryHouse(filteredTempororaryHouse);
      } catch (error) {
        console.log(error);
      }
    };

    if (!temporaryHouses.length && session.status === "authenticated")
      getTemporaryHouses();
  }, [session]);

  return (
    <Grid my={8} h="100%" gridTemplateColumns={isMobile ? "1fr" : "16rem 1fr"}>
      <aside>
        <Box boxShadow={isMobile ? undefined : "base"}>
          <Flex
            flexDir="column"
            mb={isMobile ? 8 : 0}
            mx={isMobile ? 8 : 0}
            gap={isMobile ? 2 : 0}
          >
            {options.map((opt, index) => (
              <OptionButton
                key={opt.value}
                index={index}
                label={opt.label}
                selected={opt.value === selectedOption}
                setSelectedOption={setSelectedOption}
                value={opt.value}
              />
            ))}
          </Flex>
        </Box>
      </aside>
      <main>{options[selectedOption].content}</main>
    </Grid>
  );
}

function OptionButton({ label, value, index, setSelectedOption, selected }) {
  if (selected)
    return (
      <Box
        color="white"
        backgroundColor="#636FFF"
        key={value}
        as="button"
        p={4}
        letterSpacing=".08em"
        fontSize="1.2rem"
        fontWeight="semibold"
        onClick={() => setSelectedOption(index)}
      >
        {label}
      </Box>
    );
  return (
    <Box
      p={4}
      letterSpacing=".08em"
      fontSize="1.2rem"
      fontWeight="semibold"
      backgroundColor="#f2f2f2"
      key={value}
      as="button"
      color="GrayText"
      onClick={() => setSelectedOption(index)}
      _hover={{
        color: "black",
      }}
    >
      {label}
    </Box>
  );
}
