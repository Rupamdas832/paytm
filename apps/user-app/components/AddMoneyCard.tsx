"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textInput";
import { Label } from "@repo/ui/label";
import { useState } from "react";
import { CreateOnRampTransactionAction } from "../app/lib/actions/createOnRampTransaction";
import { DECIMAL_COUNT } from "../constants/common";
import { CreateTransactionAction } from "../app/lib/actions/createTransaction";
import { User } from "../types/common.type";

const SUPPORTED_BANKS = [
  {
    key: "HDFC Bank",
    value: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  { key: "SBI Bank", value: "SBI Bank", redirectUrl: "https://onlinesbi.sbi" },
];
const AddMoneyCard = ({ user }: { user: User }) => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.key || "");

  const handleAddMoneyClick = async () => {
    try {
      const currentTransaction = await CreateTransactionAction({
        amount: amount * DECIMAL_COUNT,
        type: "TOP_UP",
        status: "Processing",
        startTime: new Date(),
        endTime: undefined,
        receiverPhoneNumber: user.number,
      });
      if (currentTransaction.transaction) {
        await CreateOnRampTransactionAction(
          amount * DECIMAL_COUNT,
          provider,
          currentTransaction.transaction.id
        );
        window.location.href = redirectUrl || "";
        setAmount(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card title="Add money">
      <TextInput
        placeholder="1000"
        label="Amount"
        type="number"
        onChange={(val) => setAmount(Number(val))}
        value={amount}
      />
      <div className="flex flex-col mt-4">
        <Label label="Bank" />
        <Select
          options={SUPPORTED_BANKS}
          onSelect={(val) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((bank) => bank.key === val)?.redirectUrl ||
                ""
            );
            setProvider(
              SUPPORTED_BANKS.find((bank) => bank.key === val)?.key || ""
            );
          }}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <Button onClick={handleAddMoneyClick}>Add money</Button>
      </div>
    </Card>
  );
};

export default AddMoneyCard;
