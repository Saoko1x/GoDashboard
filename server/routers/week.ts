import { PrismaClient } from '@prisma/client';
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

const prisma = new PrismaClient();

export const weeksRouter = router({
  get: publicProcedure.query(async () => {
    return prisma.week.findMany({
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
    .input(
      z.object({
        companyId: z.number()
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return prisma.week.findMany({
        where: {
          companyId: input.companyId
        },
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
        startDate: z.string(),
        endDate: z.string(),
        companyId: z.number()
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.week.create({
        data: {
          name: input.name,
          startDate: new Date(input.startDate),
          endDate: new Date(input.endDate),
          companyId: input.companyId
        }
      });
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await prisma.week.findFirst({
        where: {
          id: input.id
        },
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
        name: z.string(),
        startDate: z.string(),
        endDate: z.string()
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.week.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          startDate: new Date(input.startDate),
          endDate: new Date(input.endDate)
        }
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.week.delete({
        where: {
          id: input.id
        }
      });
    })
});
