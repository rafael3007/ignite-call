import * as z from 'zod'

export const confirmStepFormSchema = z.object({
  name: z.string().min(3, 'Digite seu nome completo'),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})
