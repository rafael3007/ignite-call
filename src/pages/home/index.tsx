import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'

import previewImage from '../../assets/calendar.png'
import Image from 'next/image'
import ClaimUsernameForm from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">Agendamento descomplicado</Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          quality={100}
          height={400}
          priority
          alt="preview"
        />
      </Preview>
    </Container>
  )
}
