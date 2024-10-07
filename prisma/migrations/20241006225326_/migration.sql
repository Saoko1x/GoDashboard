/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `TextTask` table. All the data in the column will be lost.
  - Added the required column `imageUrl1` to the `TextTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TextTask" DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl1" TEXT NOT NULL;
