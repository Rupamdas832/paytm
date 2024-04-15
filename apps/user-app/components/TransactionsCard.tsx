import { Card } from "@repo/ui/card";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
  User,
} from "../types/common.type";
import { DECIMAL_COUNT } from "../constants/common";

const getStatusColor = (status: TransactionStatus) => {
  if (status === "Success") {
    return "text-green-500";
  } else if (status === "Processing") {
    return "text-orange-500";
  }
  return "text-red-500";
};

const getIsReceiver = (user: User, transaction: Transaction) =>
  Number(user.id) === Number(transaction.receiverUserId);

const getTypeText = (
  type: TransactionType,
  isReceiver: boolean,
  receiverName: string | null,
  senderName: string | null
) => {
  if (type === "TOP_UP") {
    return "Top-up";
  } else if (type === "SEND_MONEY" && isReceiver) {
    return `Received from ${senderName ? senderName : ""}`;
  } else {
    return `Sent to ${receiverName ? receiverName : ""}`;
  }
};

const TransactionsCard = ({
  transactions,
  user,
}: {
  transactions: Transaction[];
  user: User;
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div>
        {transactions.map((transaction) => {
          return (
            <div
              key={transaction.id}
              className="flex justify-between items-center mt-4  border-b-2 pb-2 border-slate-300"
            >
              <div>
                <p className="font-medium">
                  {getTypeText(
                    transaction.type,
                    getIsReceiver(user, transaction),
                    transaction.receiver.name,
                    transaction.sender.name
                  )}
                </p>
                <p className="text-slate-600 text-xs">
                  {transaction.startTime.toDateString()}
                </p>
              </div>
              <div>
                <p>
                  {getIsReceiver(user, transaction) ? "+" : "-"}Rs{" "}
                  {transaction.amount / DECIMAL_COUNT}
                </p>
                <p
                  className={`${getStatusColor(transaction.status)} text-xs text-right`}
                >
                  {transaction.status}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TransactionsCard;
