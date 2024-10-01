import { PrismaClient } from '@prisma/client';
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

const prisma = new PrismaClient();

export const trainingRouter = router({
  get: publicProcedure.query(async () => {
    return prisma.training.findMany({
      include: {
        tasks: {
          include: {
            textTask: true,
            videoTask: true,
            tipsTask: true
          }
        }
      }
    });
  }),
  getByCompanyId: publicProcedure
    .input(z.object({ companyId: z.number() }))
    .query(async ({ input }) => {
      return prisma.training.findMany({
        where: { companyId: input.companyId },
        include: {
          tasks: {
            include: {
              textTask: true,
              videoTask: true,
              tipsTask: true
            }
          }
        }
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        companyId: z.number()
      })
    )
    .mutation(async ({ input }) => {
      return prisma.training.create({
        data: {
          name: input.name,
          companyId: input.companyId
        }
      });
    }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return prisma.training.findUnique({
        where: { id: input.id },
        include: {
          tasks: {
            include: {
              textTask: true,
              videoTask: true,
              tipsTask: true
            }
          }
        }
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string()
      })
    )
    .mutation(async ({ input }) => {
      return prisma.training.update({
        where: { id: input.id },
        data: { name: input.name }
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return prisma.training.delete({
        where: { id: input.id }
      });
    })
});
