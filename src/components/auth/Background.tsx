import { Image } from "@chakra-ui/react";

export default function Background() {
  return (
    <>
      {[0, 0].map((_, index) => (
        <Image
          key={"image-" + index}
          src="/logo.svg"
          alt="logo"
          transform="rotate(-15deg)"
          w="2764px"
          h="1101px"
          zIndex="-1"
          position="fixed"
          {...(index === 0
            ? { top: "-508px", left: "-231px" }
            : { bottom: "-508px", right: "-231px" })}
        />
      ))}
    </>
  );
}
