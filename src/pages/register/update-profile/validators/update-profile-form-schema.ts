import * as z from 'zod'

export const UpdateProfileFormSchema = z.object({
  bio: z.string().max(100, {
    message: 'A bio pode ter no máximo 100 letras',
  }),
})
