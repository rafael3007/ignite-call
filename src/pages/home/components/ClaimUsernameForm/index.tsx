import { Button, TextInput } from '@ignite-ui/react'
import { Form } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { claimUsernameFormSchema } from '@/src/pages/home/validators/claim-username-form-schema'

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export default function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
        {...register('username')}
        prefix="ignite.com/"
        placeholder="seu-usuario"
        size="sm"
      />
      <Button type="submit" size="sm">
        Reservar usuário
        <ArrowRight weight="bold" />
      </Button>
    </Form>
  )
}
