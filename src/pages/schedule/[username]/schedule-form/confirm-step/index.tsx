import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import * as z from 'zod'
import { confirmStepFormSchema } from './validators/confirm-step-form-schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { api } from '@/src/lib/axios'
import { useRouter } from 'next/router'

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

type confirmStepFormData = z.infer<typeof confirmStepFormSchema>

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const router = useRouter()

  const username = String(router.query.username)

  const describeDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describeTime = dayjs(schedulingDate).format('HH:mm[h]')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<confirmStepFormData>({
    resolver: zodResolver(confirmStepFormSchema),
  })

  async function handleConfirmScheduling(data: confirmStepFormData) {
    const { name, email, observations } = data
    await api
      .post(`users/${username}/schedule`, {
        name,
        email,
        observations,
        date: schedulingDate,
      })
      .then(() => {
        alert('Agendamento realizado com sucesso!')
      })
      .catch((error) => {
        console.error(error)
        alert('Erro ao realizar agendamento.')
      })

    onCancelConfirmation()
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describeDate}
        </Text>
        <Text>
          <Clock />
          {describeTime}
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput
          placeholder="Seu nome"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
          {...register('name')}
        />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
          crossOrigin={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
        {errors.observations && (
          <FormError>{errors.observations.message}</FormError>
        )}
      </label>

      <FormActions>
        <Button
          type="button"
          variant="tertiary"
          onClick={onCancelConfirmation}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
