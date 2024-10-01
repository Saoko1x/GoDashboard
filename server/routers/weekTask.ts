import { PrismaClient } from '@prisma/client';
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

const prisma = new PrismaClient();

export const weekTaskRouter = router({
  get: publicProcedure.query(async () => {
    return prisma.task.findMany({
      include: {
        week: true
      }
    });
  }),
  getById: publicProcedure
    .input(
      z.object({
        taskId: z.number()
      })
    )
    .query(async ({ input }) => {
      const { taskId } = input;

      return await prisma.task.findFirst({
        where: { id: taskId },
        include: {
          week: true
        }
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        weekId: z.number(),
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
      const { weekId, textTask, videoTask, tipsTask } = input;

      return await prisma.task.create({
        data: {
          weekId: weekId,
          textTask: textTask
            ? {
                create: {
                  name: textTask.name,
                  title1: textTask.title1,
                  text1: textTask.text1,
                  title2: textTask.title2,
                  text2: textTask.text2,
                  title3: textTask.title3,
                  text3: textTask.text3
                }
              }
            : undefined,
          videoTask: videoTask
            ? {
                create: {
                  videoUrl: videoTask.videoUrl,
                  name: videoTask.name
                }
              }
            : undefined,
          tipsTask: tipsTask
            ? {
                create: {
                  name: tipsTask.name,
                  title1: tipsTask.title1,
                  text1: tipsTask.text1,
                  title2: tipsTask.title2,
                  text2: tipsTask.text2,
                  title3: tipsTask.title3,
                  text3: tipsTask.text3
                }
              }
            : undefined
        }
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        taskId: z.number(),
        weekId: z.number().optional(),
        textTask: z
          .object({
            name: z.string().optional(),
            title1: z.string().optional(),
            text1: z.string().optional(),
            title2: z.string().optional(),
            text2: z.string().optional(),
            title3: z.string().optional(),
            text3: z.string().optional()
          })
          .optional(),
        videoTask: z
          .object({
            videoUrl: z.string().url().optional(),
            name: z.string().optional()
          })
          .optional(),
        tipsTask: z
          .object({
            name: z.string().optional(),
            title1: z.string().optional(),
            text1: z.string().optional(),
            title2: z.string().optional(),
            text2: z.string().optional(),
            title3: z.string().optional(),
            text3: z.string().optional()
          })
          .optional()
      })
    )
    .mutation(async ({ input }) => {
      const { taskId, weekId, textTask, videoTask, tipsTask } = input;

      await prisma.task.update({
        where: { id: taskId },
        data: {
          weekId,
          textTask: textTask
            ? {
                update: textTask
              }
            : undefined,
          videoTask: videoTask
            ? {
                update: videoTask
              }
            : undefined,
          tipsTask: tipsTask
            ? {
                update: tipsTask
              }
            : undefined
        }
      });
    }),

  delete: publicProcedure
    .input(
      z.object({
        taskId: z.number()
      })
    )
    .mutation(async ({ input }) => {
      const { taskId } = input;
      await prisma.textTask.deleteMany({ where: { taskId } });
      await prisma.videoTask.deleteMany({ where: { taskId } });
      await prisma.tipsTask.deleteMany({ where: { taskId } });

      return await prisma.task.delete({
        where: { id: taskId }
      });
    })
});
