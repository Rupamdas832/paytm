"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function CreateOnRampTransactionAction(
  amount: number,
  provider: string,
  transactionId: number
) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  //TODO: Ideally token should come from bank
  const token = Math.random().toString();
  if (!userId) {
    return { message: "User not logged In" };
  }
  try {
    await prisma.onRampTransaction.create({
      data: {
        userId: Number(session?.user?.id),
        amount,
        startTime: new Date(),
        status: "Processing",
        token,
        provider,
        transactionId,
      },
    });
    return { message: "Onramp transaction added" };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong!Try again" };
  }
}
