"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { TransactionStatus, TransactionType } from "../../../types/common.type";

export async function CreateTransactionAction({
  amount,
  type,
  status,
  startTime,
  endTime,
  receiverPhoneNumber,
}: {
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  startTime: Date;
  endTime: Date | undefined;
  receiverPhoneNumber: string;
}) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  if (!userId) {
    return { message: "User not logged In" };
  }
  try {
    const receiverUser = await prisma.user.findFirst({
      where: {
        number: receiverPhoneNumber,
      },
    });
    if (!receiverUser) {
      return { message: "Receiver not found" };
    }

    const currentTransaction = await prisma.transaction.create({
      data: {
        senderUserId: Number(session?.user?.id),
        receiverUserId: receiverUser.id,
        amount,
        startTime,
        status,
        type: type,
        endTime,
      },
    });
    return { message: "Transaction added", transaction: currentTransaction };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong!Try again" };
  }
}
