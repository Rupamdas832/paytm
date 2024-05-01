import { getServerSession } from "next-auth";
import QRCode from "react-qr-code";
import { authOptions } from "../../lib/auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
      <div className="mt-4">
        <h2>My QR Code</h2>
        {session && session?.user?.email && (
          <QRCode value={`${session.user?.email}`} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
