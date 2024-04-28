import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import AddMoneyCard from "../../../components/AddMoneyCard";
import OnRampTransactionsCard from "../../../components/OnRampTransactionsCard";

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
    id: t.id,
    token: t.token,
    userId: t.userId,
  }));
}

export default async function () {
  const transactions = await getOnRampTransactions();
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold text-blue-600">Transfer</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full mt-4">
        {session.user && <AddMoneyCard user={session.user} />}
        <div className="flex flex-1 flex-col w-full">
          <OnRampTransactionsCard transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
