import { Card } from "@repo/ui/card";
import { OnRampTransaction } from "../types/common.type";
import { DECIMAL_COUNT } from "../constants/common";

const getStatusText = (status: string) => {
  if (status === "Success") {
    return "Received INR";
  } else if (status === "Processing") {
    return "Processing";
  }
  return "Failed";
};

const OnRampTransactionsCard = ({
  transactions,
}: {
  transactions: OnRampTransaction[];
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
                  {getStatusText(transaction.status)}
                </p>
                <p className="text-slate-600 text-xs">
                  {transaction.time.toDateString()}
                </p>
              </div>
              <p>+Rs {transaction.amount / DECIMAL_COUNT}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default OnRampTransactionsCard;
