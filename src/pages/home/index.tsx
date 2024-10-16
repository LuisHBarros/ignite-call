import { Heading, Text } from "@ignite-ui/react";
import { Container, Hero, Preview } from "./styles";
import previewImage from "../../../public/app-preview.png";
import Image from "next/image";
import { ClaimUsernameForm } from "./components/ClaimUsernameForm";

export default function Home() {
  return (
      <Container>
          <Hero>
              <Heading as="h1" size="4xl">Agendamento descomplicado</Heading>
              <Text size="lg">
                  Conecte seu calendario e permita que pessoas marquem agendamentos no seu tempo livre
              </Text>
              <ClaimUsernameForm />
          </Hero>
          <Preview>
              <Image src={previewImage} alt="Calendario simbolizando o funcionamento do aplicativo"
                  height={400} quality={100} priority />
          </Preview> 
      </Container>
  );
}
