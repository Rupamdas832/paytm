"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { CreateTransactionAction } from "./createTransaction";

export const P2PTransferAction = async (
  phoneNumber: string,
  amount: number,
  startTime: Date
) => {
  const session = await getServerSession(authOptions);
  try {
    if (!session?.user) {
      return { message: "Failed to get sender details" };
    }
    const targetUser = await prisma.user.findFirst({
      where: {
        number: phoneNumber,
      },
    });
    if (!targetUser) {
      return { message: "Failed to get reciever details" };
    }
    const senderBalance = await prisma.balance.findUnique({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    if (!senderBalance || senderBalance.amount < amount) {
      throw new Error("Insufficient funds");
    }
    await prisma.$transaction(async (txn) => {
      await txn.balance.update({
        where: {
          userId: Number(session?.user?.id),
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });
      await txn.balance.update({
        where: {
          userId: targetUser.id,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });
      await CreateTransactionAction({
        amount: amount,
        type: "SEND_MONEY",
        status: "Success",
        startTime,
        endTime: new Date(),
        receiverPhoneNumber: String(phoneNumber),
      });
    });
    return { message: "Money send successfully!" };
  } catch (error) {
    console.log(error);
    return { message: "Money send successfully!", error };
  }
};
