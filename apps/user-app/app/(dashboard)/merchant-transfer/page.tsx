"use client";
import { Button } from "@repo/ui/button";
import useSocket from "../../../hooks/useSocket";
import { useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import QrReader from "../../../components/QrReader";

export default function MerchantTransfer() {
  const { socket } = useSocket();
  const [scannedResult, setScannedResult] = useState<string | undefined>("");
  const [receiverEmail, setReceiverEmail] = useState<string | null>(null);

  const handleMerchantSend = (message: string, referenceId: number) => {
    if (receiverEmail) {
      socket.emit("send_notification", {
        email: receiverEmail,
        message,
        referenceId,
        type: "Payment",
      });
    }
  };

  const handleScanQrCode = (val: string) => {
    setScannedResult(val);
    setReceiverEmail(val);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Merchant Transfer</h1>
      <div className="max-w-72 mt-4">
        <TextInput
          type="email"
          placeholder="sample@gmail.com"
          label="Email ID"
          onChange={(val) => setReceiverEmail(val)}
        />
        {!scannedResult && <QrReader setScannedResult={handleScanQrCode} />}
        {scannedResult && scannedResult}
        <div className="mt-4">
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
      </div>
    </div>
  );
}
