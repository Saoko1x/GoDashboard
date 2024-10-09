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
      const user = await prisma.company.create({
        data: {
          email,
          password,
          name
        }
      });
      return user;
    }),
  updateProfile: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { name, email } = input;
      const user = await prisma.company.update({
        where: { email },
        data: { name }
      });
      return user;
    }),
  getCompanyIdByEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email()
      })
    )
    .query(async ({ input }) => {
      const { email } = input;
      const company = await prisma.company.findUnique({
        where: { email },
        select: { id: true }
      });

      if (!company) {
        throw new Error('Company not found');
      }

      return company.id;
    })
});
