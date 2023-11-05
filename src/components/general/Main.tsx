import { Container, ContainerProps } from "@chakra-ui/react";
import Background from "../auth/Background";

export default function Main({
  children,
  uPetsBackground,
  ...containerProps
}: ContainerProps & { children: React.ReactNode; uPetsBackground?: boolean }) {
  return (
    <Container as="main" h="100vh" w="100vw" {...containerProps}>
      {children}
      {uPetsBackground && <Background />}
    </Container>
  );
}
