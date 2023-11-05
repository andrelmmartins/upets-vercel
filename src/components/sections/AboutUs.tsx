import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import Doodle from "../general/Doodle";

export default function AboutUs() {
  return (
    <Box py="6.25rem" bg="gray.2">
      <Container>
        <Stack gap="3.125rem" pos="relative">
          <Heading as="h2" fontSize="1.875rem">
            Quem somos? Qual o nosso objetivo?
          </Heading>
          <Text lineHeight="base">
            O Lorem Ipsum é um texto modelo da indústria tipográfica e de
            impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por
            estas indústrias desde o ano de 1500, quando uma misturou os
            caracteres de um texto para criar um espécime de livro. Este texto
            não só sobreviveu 5 séculos, mas também o salto para a tipografia
            electrónica, mantendo-se essencialmente inalterada. Foi popularizada
            nos anos 60 com a disponibilização das folhas de Letraset, que
            continham passagens com Lorem Ipsum, e mais recentemente com os
            programas de publicação como o Aldus PageMaker que incluem versões
            do Lorem Ipsum.
          </Text>
          <Doodle
            variant="cat-1"
            w="10rem"
            h="4.96rem"
            right="0"
            top="-6.25rem"
            pos="absolute"
            style={{
              transform: "rotate(180deg)",
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
