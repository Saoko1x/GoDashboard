import { PrismaClient } from '@prisma/client';
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

const prisma = new PrismaClient();

export const onboardingRouter = router({
  createOrUpdateCompanyOnboarding: publicProcedure
    .input(
      z.object({
        companyId: z.number(),
        questions: z.array(
          z.object({
            question: z.string(),
            answers: z.array(z.string())
          })
        )
      })
    )
    .mutation(async ({ input }) => {
      const { companyId, questions } = input;

      return prisma.$transaction(async (prisma) => {
        // Buscar el onboarding existente para esta empresa específica
        const existingOnboarding = await prisma.onboarding.findUnique({
          where: { companyId },
          include: {
            questions: {
              include: {
                answers: true
              }
            }
          }
        });

        if (existingOnboarding) {
          // Eliminar respuestas y preguntas existentes para esta empresa
          await prisma.onboardingAnswer.deleteMany({
            where: {
              onboardingQuestion: { onboardingId: existingOnboarding.id }
            }
          });

          await prisma.onboardingQuestion.deleteMany({
            where: { onboardingId: existingOnboarding.id }
          });

          // Actualizar el onboarding existente con las nuevas preguntas y respuestas
          return prisma.onboarding.update({
            where: { companyId },
            data: {
              questions: {
                create: questions.map((q) => ({
                  question: q.question,
                  answers: {
                    create: q.answers.map((a) => ({ answerText: a }))
                  }
                }))
              }
            },
            include: { questions: { include: { answers: true } } }
          });
        } else {
          // Crear un nuevo onboarding para esta empresa
          return prisma.onboarding.create({
            data: {
              companyId,
              questions: {
                create: questions.map((q) => ({
                  question: q.question,
                  answers: {
                    create: q.answers.map((a) => ({ answerText: a }))
                  }
                }))
              }
            },
            include: { questions: { include: { answers: true } } }
          });
        }
      });
    }),

  getCompanyOnboarding: publicProcedure
    .input(z.object({ companyId: z.number() }))
    .query(async ({ input }) => {
      return prisma.onboarding.findFirst({
        where: { companyId: input.companyId },
        include: { questions: { include: { answers: true } } }
      });
    }),

  getUserResponses: publicProcedure
    .input(z.object({ profileId: z.number() }))
    .query(async ({ input }) => {
      return prisma.userOnboardingResponse.findMany({
        where: { profileId: input.profileId },
        include: {
          question: true,
          answer: true
        }
      });
    })
});
