import { PrismaClient } from '@prisma/client';
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

const prisma = new PrismaClient();

export const onboardingRouter = router({
  create: publicProcedure
    .input(
      z.object({
        profileId: z.number(),
        questions: z.array(
          z.object({
            question: z.string(),
            answers: z.array(z.string())
          })
        )
      })
    )
    .mutation(async ({ input }) => {
      return prisma.onboarding.create({
        data: {
          profileId: input.profileId,
          questions: {
            create: input.questions.map((q) => ({
              question: q.question,
              answers: {
                create: q.answers.map((a) => ({ answerText: a }))
              }
            }))
          }
        },
        include: { questions: { include: { answers: true } } }
      });
    }),

  getByProfileId: publicProcedure
    .input(z.object({ profileId: z.number() }))
    .query(async ({ input }) => {
      return prisma.onboarding.findUnique({
        where: { profileId: input.profileId },
        include: { questions: { include: { answers: true } } }
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        profileId: z.number(),
        questions: z.array(
          z.object({
            id: z.number().optional(),
            question: z.string(),
            answers: z.array(
              z.object({
                id: z.number().optional(),
                answerText: z.string()
              })
            )
          })
        )
      })
    )
    .mutation(async ({ input }) => {
      const { profileId, questions } = input;

      const onboarding = await prisma.onboarding.upsert({
        where: { profileId },
        create: { profileId },
        update: {}
      });

      for (const q of questions) {
        if (q.id) {
          await prisma.onboardingQuestion.update({
            where: { id: q.id },
            data: {
              question: q.question,
              answers: {
                upsert: q.answers.map((a) => ({
                  where: { id: a.id || 0 },
                  create: { answerText: a.answerText },
                  update: { answerText: a.answerText }
                }))
              }
            }
          });
        } else {
          await prisma.onboardingQuestion.create({
            data: {
              onboardingId: onboarding.id,
              question: q.question,
              answers: {
                create: q.answers.map((a) => ({ answerText: a.answerText }))
              }
            }
          });
        }
      }

      return prisma.onboarding.findUnique({
        where: { profileId },
        include: { questions: { include: { answers: true } } }
      });
    }),

  delete: publicProcedure
    .input(z.object({ profileId: z.number() }))
    .mutation(async ({ input }) => {
      return prisma.onboarding.delete({
        where: { profileId: input.profileId }
      });
    })
});
