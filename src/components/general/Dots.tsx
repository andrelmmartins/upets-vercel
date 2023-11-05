import { Box, BoxProps } from "@chakra-ui/react";

export default function Dots(props: {
  h?: BoxProps["h"];
  w?: BoxProps["w"];
  space?: BoxProps["top"];
  bg?: BoxProps["bg"];
}) {
  const h = "0.9375rem";
  const w = "0.9375rem";
  const space = "0.9375rem";
  const bg = "black";

  return (
    <>
      <Box
        pos="absolute"
        h={props.h || h}
        w={props.w || w}
        bg={props.bg || bg}
        top={props.space || space}
        left={props.space || space}
        borderRadius={props.space || space}
      />
      <Box
        pos="absolute"
        h={props.h || h}
        w={props.w || w}
        bg={props.bg || bg}
        top={props.space || space}
        right={props.space || space}
        borderRadius={props.space || space}
      />
      <Box
        pos="absolute"
        h={props.h || h}
        w={props.w || w}
        bg={props.bg || bg}
        bottom={props.space || space}
        left={props.space || space}
        borderRadius={props.space || space}
      />
      <Box
        pos="absolute"
        h={props.h || h}
        w={props.w || w}
        bg={props.bg || bg}
        bottom={props.space || space}
        right={props.space || space}
        borderRadius={props.space || space}
      />
    </>
  );
}
