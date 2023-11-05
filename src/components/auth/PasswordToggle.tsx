import { Icon, InputRightElement } from "@chakra-ui/react";
import { ClosedEyeIcon, OpenedEyeIcon } from "../general/Icons";

export type PasswordType = "text" | "password";

export default function PasswordToggle({
  type,
  setType,
}: {
  type: PasswordType;
  setType: (type: PasswordType) => void;
}) {
  function toggleType() {
    type === "text" ? setType("password") : setType("text");
  }

  return (
    <InputRightElement
      h="3.25rem"
      w="3.25rem"
      m="0.25rem"
      transition="all 0.2s"
      borderRadius="0.25rem"
      _hover={{ bg: "gray.3" }}
      onClick={toggleType}
      cursor="pointer"
    >
      <Icon h="1.25rem" w="1.25rem">
        {type === "text" ? <ClosedEyeIcon /> : <OpenedEyeIcon />}
      </Icon>
    </InputRightElement>
  );
}
