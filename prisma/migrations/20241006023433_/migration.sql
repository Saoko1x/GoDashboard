-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "userid" UUID NOT NULL,
    "updated_at" TIMESTAMP(3),
    "username" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone" TEXT,
    "birthdate" TIMESTAMP(3),
    "genre" TEXT,
    "companyid" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "eventUrl" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Onboarding" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnboardingQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "onboardingId" INTEGER NOT NULL,

    CONSTRAINT "OnboardingQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "answerText" TEXT NOT NULL,
    "onboardingQuestionId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Week" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Week_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "weekId" INTEGER NOT NULL,
    "completedById" INTEGER,
    "completedAt" TIMESTAMP(3),
    "status" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextTask" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "title1" TEXT NOT NULL,
    "text1" TEXT NOT NULL,
    "title2" TEXT NOT NULL,
    "text2" TEXT NOT NULL,
    "title3" TEXT NOT NULL,
    "text3" TEXT NOT NULL,

    CONSTRAINT "TextTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoTask" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VideoTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipsTask" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "title1" TEXT NOT NULL,
    "text1" TEXT NOT NULL,
    "title2" TEXT NOT NULL,
    "text2" TEXT NOT NULL,
    "title3" TEXT NOT NULL,
    "text3" TEXT NOT NULL,

    CONSTRAINT "TipsTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoostTask" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "completedById" INTEGER,
    "completedAt" TIMESTAMP(3),
    "status" TEXT,

    CONSTRAINT "BoostTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoostTextTask" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "title1" TEXT NOT NULL,
    "text1" TEXT NOT NULL,
    "title2" TEXT NOT NULL,
    "text2" TEXT NOT NULL,
    "title3" TEXT NOT NULL,
    "text3" TEXT NOT NULL,

    CONSTRAINT "BoostTextTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoostVideoTask" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BoostVideoTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoostTipsTask" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "title1" TEXT NOT NULL,
    "text1" TEXT NOT NULL,
    "title2" TEXT NOT NULL,
    "text2" TEXT NOT NULL,
    "title3" TEXT NOT NULL,
    "text3" TEXT NOT NULL,

    CONSTRAINT "BoostTipsTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingTask" (
    "id" SERIAL NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "completedById" INTEGER,
    "completedAt" TIMESTAMP(3),
    "status" TEXT,

    CONSTRAINT "TrainingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingTextTask" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "title1" TEXT NOT NULL,
    "text1" TEXT NOT NULL,
    "title2" TEXT NOT NULL,
    "text2" TEXT NOT NULL,
    "title3" TEXT NOT NULL,
    "text3" TEXT NOT NULL,

    CONSTRAINT "TrainingTextTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingVideoTask" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TrainingVideoTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingTipsTask" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "title1" TEXT NOT NULL,
    "text1" TEXT NOT NULL,
    "title2" TEXT NOT NULL,
    "text2" TEXT NOT NULL,
    "title3" TEXT NOT NULL,
    "text3" TEXT NOT NULL,

    CONSTRAINT "TrainingTipsTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userid_key" ON "profiles"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "Onboarding_profileId_key" ON "Onboarding"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "TextTask_taskId_key" ON "TextTask"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoTask_taskId_key" ON "VideoTask"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "TipsTask_taskId_key" ON "TipsTask"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "BoostTextTask_taskId_key" ON "BoostTextTask"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "BoostVideoTask_taskId_key" ON "BoostVideoTask"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "BoostTipsTask_taskId_key" ON "BoostTipsTask"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingTextTask_taskId_key" ON "TrainingTextTask"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingVideoTask_taskId_key" ON "TrainingVideoTask"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingTipsTask_taskId_key" ON "TrainingTipsTask"("taskId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_companyid_fkey" FOREIGN KEY ("companyid") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Onboarding" ADD CONSTRAINT "Onboarding_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingQuestion" ADD CONSTRAINT "OnboardingQuestion_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "Onboarding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_onboardingQuestionId_fkey" FOREIGN KEY ("onboardingQuestionId") REFERENCES "OnboardingQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Week" ADD CONSTRAINT "Week_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextTask" ADD CONSTRAINT "TextTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoTask" ADD CONSTRAINT "VideoTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipsTask" ADD CONSTRAINT "TipsTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoostTask" ADD CONSTRAINT "BoostTask_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoostTask" ADD CONSTRAINT "BoostTask_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoostTextTask" ADD CONSTRAINT "BoostTextTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "BoostTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoostVideoTask" ADD CONSTRAINT "BoostVideoTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "BoostTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoostTipsTask" ADD CONSTRAINT "BoostTipsTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "BoostTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingTask" ADD CONSTRAINT "TrainingTask_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingTask" ADD CONSTRAINT "TrainingTask_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingTextTask" ADD CONSTRAINT "TrainingTextTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TrainingTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingVideoTask" ADD CONSTRAINT "TrainingVideoTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TrainingTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingTipsTask" ADD CONSTRAINT "TrainingTipsTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TrainingTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;
