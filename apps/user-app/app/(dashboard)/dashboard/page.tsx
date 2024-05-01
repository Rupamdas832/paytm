import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import BalanceCard from "../../../components/BalanceCard";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

export default async function () {
  const balance = await getBalance();

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
      <div className="max-w-96 mt-4">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
      </div>
    </div>
  );
}
