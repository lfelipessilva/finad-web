import z from 'zod'

export const parseZodErrors = (error: z.ZodError) => {
  return error.issues.map((issue: any) => {
    return {
      inputName: issue.path[0],
      message: issue.message ?? 'Campo Inválido'
    }
  })
}