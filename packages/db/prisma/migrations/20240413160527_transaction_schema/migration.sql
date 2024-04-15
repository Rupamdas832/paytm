/*
  Warnings:

  - Added the required column `transactionId` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('Success', 'Failure', 'Processing');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('RECEIVED', 'SEND', 'TOPUP');

-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "transactionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
