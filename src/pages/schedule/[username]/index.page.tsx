import { Avatar, Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from './styles'

export default function Schedules() {
  return (
    <Container>
      <UserHeader>
        <Avatar src={'https://github.com/rafael3007.png'} />
        <Heading>Rafael Brito</Heading>
        <Text>Fullstack developer | BI</Text>
      </UserHeader>
    </Container>
  )
}
