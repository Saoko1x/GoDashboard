import { PrismaClient } from '@prisma/client';
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

const prisma = new PrismaClient();

export const usersRouter = router({
  get: publicProcedure.query(async () => {
    return prisma.profile.findMany();
  }),
  getAllUsers: publicProcedure.query(async () => {
    return prisma.profile.findMany();
  }),
  getCompletedTasksByUser: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const { userId } = input;
      return prisma.task.findMany({
        where: { completedById: userId, status: 'completed' }
      });
    }),
  getCompletedBoostTasksByUser: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const { userId } = input;
      return prisma.boostTask.findMany({
        where: { completedById: userId, status: 'completed' }
      });
    }),
  getCompletedTrainingTasksByUser: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const { userId } = input;
      return prisma.trainingTask.findMany({
        where: { completedById: userId, status: 'completed' }
      });
    }),
  getAllUsersWithCompletedTasks: publicProcedure.query(async () => {
    return prisma.profile.findMany({
      select: {
        id: true,
        username: true,
        _count: {
          select: {
            completedTasks: true,
            completedBoostTasks: true,
            completedTrainingTasks: true
          }
        }
      }
    });
  })
});