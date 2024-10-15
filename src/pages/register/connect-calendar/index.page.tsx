import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Header, Container } from "../styles";
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ConnectCalendar() {
  const session = useSession();
  if (session.data) {
    console.log(session.data);
  }
  const router = useRouter();

  const hasAuthError: boolean = router.query.error === "permissions";

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que eles são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnectBox>
        <ConnectItem>
          Google Calendar
          <Button
            variant="secondary"
            size="sm"
            onClick={() => signIn("google")}
          >
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>
        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </AuthError>
        )}
        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
