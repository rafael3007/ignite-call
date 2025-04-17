import * as z from 'zod'

export const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário deve ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Apenas letras e hifens são permitidos',
    })
    .transform((username) => username.toLowerCase()),
})
