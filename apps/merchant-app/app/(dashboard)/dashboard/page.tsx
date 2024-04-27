"use client";
import QRCode from "react-qr-code";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <QRCode value="http://localhost:3001/transfer" />
    </div>
  );
};

export default Dashboard;
