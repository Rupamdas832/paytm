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
      return {
        isError: true,
        isSuccess: false,
        message: "Insufficient funds",
        statusCode: 400,
      };
    }
    let transaction = {};
    await prisma.$transaction(async (txn: any) => {
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
      transaction = await CreateTransactionAction({
        amount: amount,
        type: "SEND_MONEY",
        status: "Success",
        startTime,
        endTime: new Date(),
        receiverPhoneNumber: String(phoneNumber),
      });
      return { message: "Transaction success" };
    });
    return {
      isError: true,
      isSuccess: false,
      data: transaction,
      message: "Money send successfully!",
      statusCode: 201,
    };
  } catch (err: any) {
    const error = err.response?.data;
    console.log(error);
    return {
      isError: true,
      isSuccess: false,
      error: error.error,
      message: error.message,
      statusCode: err.response.status,
    };
  }
};
