"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { P2PTransferAction } from "../app/lib/actions/p2pTransfer";
import { DECIMAL_COUNT } from "../constants/common";
import { useRouter } from "next/navigation";
import { CreateTransactionAction } from "../app/lib/actions/createTransaction";

const P2PTransferCard = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const handleSendMoneyClick = async () => {
    setError("");
    if (phoneNumber && amount) {
      const startTime = new Date();
      try {
        const response = await P2PTransferAction(
          String(phoneNumber),
          amount * DECIMAL_COUNT,
          startTime
        );

        if (response.statusCode === 201) {
          router.push("/transactions");
        } else if (response.statusCode === 400) {
          setError(response.message);
        }
      } catch (error: any) {
        await CreateTransactionAction({
          amount: amount * DECIMAL_COUNT,
          type: "SEND_MONEY",
          status: "Failure",
          startTime,
          endTime: new Date(),
          receiverPhoneNumber: String(phoneNumber),
        });
        setError("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <Card title="Send money P2P">
      <TextInput
        placeholder="9432014578"
        type="number"
        onChange={(val) => setPhoneNumber(Number(val))}
        label="Phone number"
        value={phoneNumber}
      />
      <TextInput
        placeholder="1000"
        type="number"
        onChange={(val) => setAmount(Number(val))}
        label="Amount"
        value={amount}
      />
      {error && <p className="text-red-500 text-center pt-2">{error}</p>}
      <div className="mt-4 flex justify-end">
        <Button onClick={handleSendMoneyClick}>Send money</Button>
      </div>
    </Card>
  );
};

export default P2PTransferCard;
