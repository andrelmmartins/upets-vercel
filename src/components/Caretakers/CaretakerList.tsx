import { useAxios } from "@/src/hooks/useAxios";
import { IUser } from "@/src/types/user";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import CaretakerItem from "./CaretakerItem";

export default function CaretakerList() {
  const axios = useAxios();
  const session = useSession();

  const [caretakerList, setCaretakerList] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    const requestCareTakerList = async () => {
      try {
        const { data } = await axios.get<IUser[]>("/user/caretakers");
        setCaretakerList(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!caretakerList.length && session.status === "authenticated")
      requestCareTakerList();
  }, [session]);

  return (
    <Flex flexDir="column" gap={8}>
      {caretakerList.map((caretaker) => (
        <CaretakerItem
          email={caretaker.email}
          name={caretaker.name}
          pets={caretaker.caretakingPets || []}
          key={caretaker.id}
          phone={caretaker.phone || ""}
        />
      ))}
    </Flex>
  );
}
