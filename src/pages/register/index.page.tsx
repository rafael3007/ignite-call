import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { registerFormSchema } from './validators/register-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container, Form, FormError, Header } from './styles'

type registerFormSchemaData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerFormSchemaData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegister(data: registerFormSchemaData) {
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size={'sm'}>Nome de usuário</Text>
          <TextInput
            {...register('username')}
            prefix="ignite.com/"
            placeholder="seu-usuário"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          {errors.username && (
            <FormError size={'sm'}>{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size={'sm'}>Nome completo</Text>
          <TextInput
            {...register('name')}
            placeholder="seu nome"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          {errors.name && (
            <FormError size={'sm'}>{errors.name.message}</FormError>
          )}
        </label>

        <Button disabled={isSubmitting} type="submit">
          Próximo passo
          <ArrowRight weight="bold" />
        </Button>
      </Form>
    </Container>
  )
}
