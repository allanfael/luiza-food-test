import { z } from 'zod'

export const schema = z.object({
  email: z.string().email({
    message: 'Email inválido',
  }),
  password: z.string().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
})

export type FormSchemaType = z.infer<typeof schema>
