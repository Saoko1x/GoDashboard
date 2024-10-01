import { PrismaClient } from '@prisma/client';
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

const prisma = new PrismaClient();

export const boostRouter = router({
  get: publicProcedure.query(async () => {
    return prisma.boostTask.findMany({
      include: {
        textTask: true,
        videoTask: true,
        tipsTask: true
      }
    });
  }),
  getByCompanyId: publicProcedure
    .input(z.object({ companyId: z.number() }))
    .query(async ({ input }) => {
      return prisma.boostTask.findMany({
        where: { companyId: input.companyId },
        include: {
          textTask: true,
          videoTask: true,
          tipsTask: true
        }
      });
    }),
  getById: publicProcedure
    .input(z.object({ taskId: z.number() }))
    .query(async ({ input }) => {
      return prisma.boostTask.findUnique({
        where: { id: input.taskId },
        include: {
          textTask: true,
          videoTask: true,
          tipsTask: true
        }
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        companyId: z.number(),
        textTask: z
          .object({
            name: z.string(),
            title1: z.string(),
            text1: z.string(),
            title2: z.string(),
            text2: z.string(),
            title3: z.string(),
            text3: z.string()
          })
          .optional(),
        videoTask: z
          .object({
            videoUrl: z.string().url(),
            name: z.string()
          })
          .optional(),
        tipsTask: z
          .object({
            name: z.string(),
            title1: z.string(),
            text1: z.string(),
            title2: z.string(),
            text2: z.string(),
            title3: z.string(),
            text3: z.string()
          })
          .optional()
      })
    )
    .mutation(async ({ input }) => {
      const { companyId, textTask, videoTask, tipsTask } = input;

      return prisma.boostTask.create({
        data: {
          companyId,
          textTask: textTask ? { create: textTask } : undefined,
          videoTask: videoTask ? { create: videoTask } : undefined,
          tipsTask: tipsTask ? { create: tipsTask } : undefined
        },
        include: {
          textTask: true,
          videoTask: true,
          tipsTask: true
        }
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        taskId: z.number(),
        textTask: z
          .object({
            name: z.string(),
            title1: z.string(),
            text1: z.string(),
            title2: z.string(),
            text2: z.string(),
            title3: z.string(),
            text3: z.string()
          })
          .optional(),
        videoTask: z
          .object({
            videoUrl: z.string().url(),
            name: z.string()
          })
          .optional(),
        tipsTask: z
          .object({
            name: z.string(),
            title1: z.string(),
            text1: z.string(),
            title2: z.string(),
            text2: z.string(),
            title3: z.string(),
            text3: z.string()
          })
          .optional()
      })
    )
    .mutation(async ({ input }) => {
      const { taskId, textTask, videoTask, tipsTask } = input;

      return prisma.boostTask.update({
        where: { id: taskId },
        data: {
          textTask: textTask ? { update: textTask } : undefined,
          videoTask: videoTask ? { update: videoTask } : undefined,
          tipsTask: tipsTask ? { update: tipsTask } : undefined
        },
        include: {
          textTask: true,
          videoTask: true,
          tipsTask: true
        }
      });
    }),
  delete: publicProcedure
    .input(z.object({ taskId: z.number() }))
    .mutation(async ({ input }) => {
      return prisma.boostTask.delete({
        where: { id: input.taskId }
      });
    })
});
