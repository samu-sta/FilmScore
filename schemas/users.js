import z from 'zod';

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    login: z.string(),
    lastName: z.string(),
    firstName: z.string(),
    birthYear: z.number(),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export function validateRegister (input) {
    return registerSchema.safeParse(input)
  }

export function validateLogin (input) {
    return loginSchema.safeParse(input)
  }