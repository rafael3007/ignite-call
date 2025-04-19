import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem } from './styles'
export default function Register() {
  // async function handleRegister(data: any) {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Connect sua agenda!</Heading>
        <Text>
          Conecte seu calendário para verificar automaticamente as datas
          disponíveis para o agendamento de chamadas.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary" size="sm">
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>

        {/* <ConnectItem>
          <Text>Outlook Calendar</Text>
          <Button variant="secondary" size="sm">
            Conectar
          </Button>
        </ConnectItem> */}

        <Button type="submit" disabled={false}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
