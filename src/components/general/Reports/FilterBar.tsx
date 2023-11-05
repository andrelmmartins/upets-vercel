import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const FilterBar = ({ value, onChange }: Props) => {
  return (
    <Flex w="100%" justifyContent="end">
      <InputGroup w="30%" size="md">
        <Input
          variant="outline"
          placeholder="Buscar por titulo ou animal"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
        <InputRightElement>
          <IconButton
            variant="ghost"
            aria-label="search"
            icon={<SearchIcon />}
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default FilterBar;
