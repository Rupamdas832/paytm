"use client";
import { Button } from "@repo/ui/button";
import useSocket from "../../../hooks/useSocket";

export default function MerchantTransfer() {
  const { socket } = useSocket();

  const handleMerchantSend = (message: string, referenceId: number) => {
    socket.emit("send_notification", {
      email: "merchant1@gmail.com",
      message,
      referenceId,
      type: "Payment",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Merchant Transfer</h1>
      <Button onClick={() => handleMerchantSend("Rs 200 send success", 1)}>
        Send money to merchant
      </Button>
      <Button onClick={() => handleMerchantSend("30% offer", 2)}>
        Send offer to merchant
      </Button>
      <Button onClick={() => handleMerchantSend("Payment successfully", 3)}>
        Payment to merchant
      </Button>
    </div>
  );
}
