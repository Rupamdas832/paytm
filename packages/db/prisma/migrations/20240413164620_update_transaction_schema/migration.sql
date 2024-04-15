/*
  Warnings:

  - The values [RECEIVED,SEND,TOPUP] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `receiverUserId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderUserId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('SEND_MONEY', 'TOP_UP');
ALTER TABLE "Transaction" ALTER COLUMN "type" TYPE "TransactionType_new" USING ("type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "userId",
ADD COLUMN     "receiverUserId" INTEGER NOT NULL,
ADD COLUMN     "senderUserId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "sender_idx" ON "Transaction"("senderUserId");

-- CreateIndex
CREATE INDEX "receiver_idx" ON "Transaction"("receiverUserId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiverUserId_fkey" FOREIGN KEY ("receiverUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
