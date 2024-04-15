import { Card } from "@repo/ui/card";
import { DECIMAL_COUNT } from "../constants/common";

const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title="Balance">
      <div className="flex justify-between items-center border-b-2 pb-2 mt-4 border-slate-300">
        <p className="font-medium">Unlocked Balance</p>
        <p>{amount / DECIMAL_COUNT} INR</p>
      </div>
      <div className="flex justify-between items-center mt-4  border-b-2 pb-2 border-slate-300">
        <p className="font-medium">Locked Balance</p>
        <p>{locked / DECIMAL_COUNT} INR</p>
      </div>
      <div className="flex justify-between items-center mt-4  border-b-2 pb-2 border-slate-300">
        <p className="font-medium">Total Balance</p>
        <p>{(amount + locked) / DECIMAL_COUNT} INR</p>
      </div>
    </Card>
  );
};

export default BalanceCard;
