/*
  Warnings:

  - You are about to drop the column `userId` on the `Credentials` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Credentials" DROP CONSTRAINT "Credentials_userId_fkey";

-- AlterTable
ALTER TABLE "Credentials" DROP COLUMN "userId";
