import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import TransactionsCard from "../../../components/TransactionsCard";

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const senderTxns = await prisma.transaction.findMany({
    where: {
      OR: [
        { senderUserId: Number(session?.user?.id) },
        { receiverUserId: Number(session?.user?.id) },
      ],
    },
    distinct: ["senderUserId", "receiverUserId", "type", "id"],
    include: {
      receiver: true,
      sender: true,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return senderTxns.map((t: any) => ({
    startTime: t.startTime,
    endTime: t.endTime,
    amount: t.amount,
    status: t.status,
    id: t.id,
    type: t.type,
    senderUserId: t.senderUserId,
    receiverUserId: t.receiverUserId,
    receiver: t.receiver,
    sender: t.sender,
  }));
}

export default async function () {
  const session = await getServerSession(authOptions);
  const transactions = await getOnRampTransactions();

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Transactions</h1>
      <div className="w-1/2 mt-4">
        {session?.user && (
          <TransactionsCard transactions={transactions} user={session.user} />
        )}
      </div>
    </div>
  );
}
