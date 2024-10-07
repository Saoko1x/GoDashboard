/*
  Warnings:

  - Added the required column `imageUrl1` to the `BoostTextTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl2` to the `BoostTextTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl1` to the `BoostTipsTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl2` to the `BoostTipsTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `TextTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl2` to the `TextTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl1` to the `TipsTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl2` to the `TipsTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl1` to the `TrainingTextTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl2` to the `TrainingTextTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl1` to the `TrainingTipsTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl2` to the `TrainingTipsTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BoostTextTask" ADD COLUMN     "imageUrl1" TEXT NOT NULL,
ADD COLUMN     "imageUrl2" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BoostTipsTask" ADD COLUMN     "imageUrl1" TEXT NOT NULL,
ADD COLUMN     "imageUrl2" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TextTask" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "imageUrl2" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TipsTask" ADD COLUMN     "imageUrl1" TEXT NOT NULL,
ADD COLUMN     "imageUrl2" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrainingTextTask" ADD COLUMN     "imageUrl1" TEXT NOT NULL,
ADD COLUMN     "imageUrl2" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrainingTipsTask" ADD COLUMN     "imageUrl1" TEXT NOT NULL,
ADD COLUMN     "imageUrl2" TEXT NOT NULL;
