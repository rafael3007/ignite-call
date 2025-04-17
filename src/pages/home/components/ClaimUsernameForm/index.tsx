import { Button, TextInput } from '@ignite-ui/react'
import { Form } from './styles'
import { ArrowRight } from 'phosphor-react'

export default function ClaimUsernameForm() {
  return (
    <Form>
      <TextInput prefix="ignite.com/" placeholder="seu-usuario" size="sm" />
      <Button type="submit" size="sm">
        Reservar usuário
        <ArrowRight weight="bold" />
      </Button>
    </Form>
  )
}
