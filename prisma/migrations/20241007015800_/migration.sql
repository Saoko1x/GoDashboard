/*
  Warnings:

  - You are about to drop the column `profileId` on the `Onboarding` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[companyId]` on the table `Onboarding` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_onboardingQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "Onboarding" DROP CONSTRAINT "Onboarding_profileId_fkey";

-- DropIndex
DROP INDEX "Onboarding_profileId_key";

-- AlterTable
ALTER TABLE "Onboarding" DROP COLUMN "profileId",
ADD COLUMN     "companyId" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "Answer";

-- CreateTable
CREATE TABLE "OnboardingAnswer" (
    "id" SERIAL NOT NULL,
    "answerText" TEXT NOT NULL,
    "onboardingQuestionId" INTEGER NOT NULL,

    CONSTRAINT "OnboardingAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnboardingResponse" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "UserOnboardingResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOnboardingResponse_profileId_questionId_key" ON "UserOnboardingResponse"("profileId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Onboarding_companyId_key" ON "Onboarding"("companyId");

-- AddForeignKey
ALTER TABLE "Onboarding" ADD CONSTRAINT "Onboarding_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingAnswer" ADD CONSTRAINT "OnboardingAnswer_onboardingQuestionId_fkey" FOREIGN KEY ("onboardingQuestionId") REFERENCES "OnboardingQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnboardingResponse" ADD CONSTRAINT "UserOnboardingResponse_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnboardingResponse" ADD CONSTRAINT "UserOnboardingResponse_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "OnboardingQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnboardingResponse" ADD CONSTRAINT "UserOnboardingResponse_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "OnboardingAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
