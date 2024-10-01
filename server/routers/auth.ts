import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authRouter = router({
  signIn: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;
      // Implement your login logic here
      const user = await prisma.company.findUnique({ where: { email } });
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }
      return user;
    }),
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { email, password, name } = input;
      // Implement your sign up logic here
      const user = await prisma.company.create({
        data: {
          email,
          password,
          name
        }
      });
      return user;
    })
});
