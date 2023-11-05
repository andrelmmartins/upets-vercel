import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import Doodle from "../general/Doodle";

export default function Video() {
  return (
    <Box py="6.25rem" bgColor="blue" bgImage="/foots.png">
      <Container>
        <Stack gap="3.125rem" align="center" pos="relative">
          <Heading
            as="h2"
            fontSize="1.875rem"
            color="white"
            textShadow="-0.25rem 0.25rem black"
            textAlign="center"
          >
            Saiba mais sobre nós!
          </Heading>
          <Box
            w="full"
            maxW="66.65rem"
            h={{ base: "fit", sm: "37.5rem" }}
            rounded="1.25rem"
            boxShadow="-0.625rem 0.625rem black"
            border="0.25rem solid"
            borderColor="black"
            bg="gray.1"
            overflow="hidden"
            style={{
              transform: "rotate(-1deg)",
            }}
          >
            <iframe
              width="720"
              height="405"
              src="https://www.youtube.com/embed/X8ghLbjjOmE"
              title="Novos animais engraçados🤣🤣 Vídeos mais engraçados de cães e gatos 😹🐶 Parte 11"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          </Box>
          <Doodle
            variant="cat-2"
            w="10rem"
            h="4.96rem"
            left="0"
            bottom="-6.25rem"
            pos="absolute"
          />
        </Stack>
      </Container>
    </Box>
  );
}
