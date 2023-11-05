import { AddIcon } from "@chakra-ui/icons";

import { Flex } from "@chakra-ui/react";
import React from "react";
import Carousel from "../ImageSlider/Carousel";

export type ImageType = {
  fileUrl: string;
  title: string;
  fileSize?: number;
  alt?: string;
};

export type FileInputProps = {
  images: ImageType[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isInvalid?: boolean;
};

export default function FileInput({
  images,
  onChange,
  disabled,
  isInvalid,
}: FileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="file-input-container">
      <Flex
        p={8}
        gap={4}
        mb={4}
        justify="center"
        alignItems="center"
        borderRadius="md"
        border={isInvalid ? "1px dashed red" : "1px dashed rgba(0, 0, 0, .3)"}
        onClick={(e) => {
          e.stopPropagation();
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
        className="file-input-wrapper"
        _hover={{
          cursor: "pointer",
        }}
        aria-disabled={disabled}
        _disabled={{
          borderColor: "#cdcdcd",
          color: "#cdcdcd",
          cursor: "not-allowed",
        }}
      >
        <AddIcon />
        <span>Adicione Fotos</span>
      </Flex>
      {images.length ? <Carousel images={images} /> : null}
      <input
        ref={inputRef}
        onChange={onChange}
        type="file"
        style={{ display: "none" }}
        disabled={disabled}
      />
    </div>
  );
}
