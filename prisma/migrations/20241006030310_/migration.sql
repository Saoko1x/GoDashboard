-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_companyid_fkey";

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "companyid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_companyid_fkey" FOREIGN KEY ("companyid") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
