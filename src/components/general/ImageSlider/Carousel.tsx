import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import React from "react";
import { ImageType } from "../FileInput/FileInput";
import "./Carousel.css";
import { Box, Flex } from "@chakra-ui/react";

export type CarouselProps = {
  images: ImageType[];
  width?: number | string;
  height?: number | string;
};

const Carousel = ({ images, width = "100%", height = 280 }: CarouselProps) => {
  const [slide, setSlide] = React.useState(0);

  const nextSlide = () => {
    setSlide((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlide((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
  };

  return (
    <Flex
      position="relative"
      justify="center"
      align="center"
      w={width}
      h={height}
    >
      <ArrowLeftIcon
        onClick={prevSlide}
        color="white"
        className="arrow arrow-left"
      />
      {images?.map((image, index) => (
        <Box
          key={image.title}
          w={image.fileUrl ? "100px" : undefined}
          h={image.fileUrl ? "180px" : undefined}
          backgroundImage={image.fileUrl}
          backgroundSize="contain"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          className={slide === index ? "slide" : "slide slide-hidden"}
        />
      ))}
      <ArrowRightIcon
        onClick={nextSlide}
        color="white"
        className="arrow arrow-right"
      />
      <span className="indicators">
        {images?.map((_image, index) => (
          <button
            key={index}
            className={
              slide === index ? "indicator" : "indicator indicator-inactive"
            }
            onClick={() => setSlide(index)}
          />
        ))}
      </span>
    </Flex>
  );
};

export default Carousel;
