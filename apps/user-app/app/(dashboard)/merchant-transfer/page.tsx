"use client";
import { Button } from "@repo/ui/button";
import useSocket from "../../../hooks/useSocket";

export default function MerchantTransfer() {
  const { socket } = useSocket();

  const handleMerchantSend = (message: string) => {
    socket.emit("send_notification", {
      email: "merchant1@gmail.com",
      message,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">P2P Transfer</h1>
      <Button onClick={() => handleMerchantSend("Rs 200 send success")}>
        Send money to merchant
      </Button>
      <Button onClick={() => handleMerchantSend("30% offer")}>
        Send offer to merchant
      </Button>
      <Button onClick={() => handleMerchantSend("Payment successfully")}>
        Payment to merchant
      </Button>
    </div>
  );
}
