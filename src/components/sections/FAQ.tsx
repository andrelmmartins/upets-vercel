import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import Doodle from "../general/Doodle";

interface QuestionProps {
  question: string;
  answer: string;
}

export default function FAQ() {
  const faq: QuestionProps[] = [
    { question: "Enunciado da Pergunta?", answer: "Texto da Resposta" },
    { question: "Enunciado da Pergunta?", answer: "Texto da Resposta" },
    { question: "Enunciado da Pergunta?", answer: "Texto da Resposta" },
    { question: "Enunciado da Pergunta?", answer: "Texto da Resposta" },
    { question: "Enunciado da Pergunta?", answer: "Texto da Resposta" },
    { question: "Enunciado da Pergunta?", answer: "Texto da Resposta" },
  ];

  return (
    <Box as="section" py="6.25rem" bg="white" gap="3.125rem">
      <Container>
        <Stack gap="3.125rem" pos="relative">
          <Heading as="h2" fontSize="1.875rem" textAlign="center">
            Perguntas Frequentes
          </Heading>

          <Accordion
            display="flex"
            flexDir="column"
            gap="0.9375rem"
            allowToggle
          >
            {faq.map(({ question, answer }, index) => (
              <AccordionItem
                border="0.1875rem solid"
                borderColor="black"
                boxShadow="-0.25rem 0.25rem 0 0 black"
                rounded="0.3125rem"
                px="1.875rem"
                key={`faq-question-${index}`}
              >
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      h="5rem"
                      _hover={{
                        bg: "none",
                      }}
                    >
                      <Text fontWeight="medium" textAlign="left">
                        {question}
                      </Text>
                      {isExpanded ? (
                        <MinusIcon color="black" h="0.875rem" w="0.875rem" />
                      ) : (
                        <AddIcon color="black" h="0.875rem" w="0.875rem" />
                      )}
                    </AccordionButton>
                    <AccordionPanel
                      py="1.875rem"
                      borderTop="1px solid"
                      borderColor="orange"
                    >
                      <Text>{answer}</Text>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
          <Doodle
            variant="dog"
            w="7.5rem"
            h="6.875rem"
            right="0"
            bottom="-6.25rem"
            pos="absolute"
          />
        </Stack>
      </Container>
    </Box>
  );
}
