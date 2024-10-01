import { PrismaClient } from '@prisma/client';
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

const prisma = new PrismaClient();

export const eventsRouter = router({
  get: publicProcedure.query(async () => {
    return prisma.event.findMany({
      include: {
        category: true
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
      return prisma.event.findMany({
        where: {
          companyId: input.companyId
        },
        include: {
          category: true
        }
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        date: z.string(),
        imageUrl: z.string(),
        eventUrl: z.string(),
        categoryId: z.number(),
        companyId: z.number()
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      console.log('Attempting to create event with input:', input);

      // Check if category exists
      const category = await prisma.category.findUnique({
        where: { id: input.categoryId }
      });
      if (!category) {
        throw new Error(`Category with id ${input.categoryId} does not exist`);
      }

      // Check if company exists
      const company = await prisma.company.findUnique({
        where: { id: input.companyId }
      });
      if (!company) {
        throw new Error(`Company with id ${input.companyId} does not exist`);
      }

      try {
        const createdEvent = await prisma.event.create({
          data: {
            title: input.title,
            date: new Date(input.date),
            imageUrl: input.imageUrl,
            eventUrl: input.eventUrl,
            categoryId: input.categoryId,
            companyId: input.companyId
          }
        });
        console.log('Event created successfully:', createdEvent);
        return createdEvent;
      } catch (error) {
        console.error('Error creating event:', error);
        throw error;
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        date: z.string(),
        imageUrl: z.string(),
        eventUrl: z.string()
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.event.update({
        where: {
          id: input.id
        },
        data: {
          title: input.title,
          date: new Date(input.date),
          imageUrl: input.imageUrl,
          eventUrl: input.eventUrl
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
      return await prisma.event.findFirst({
        where: {
          id: input.id
        },
        include: {
          category: true
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
      await prisma.event.delete({
        where: {
          id: input.id
        },
        include: {
          category: true
        }
      });
    })
});
