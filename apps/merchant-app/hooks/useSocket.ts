import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<any>(null);

  const fetchSession = async (newSocket: any) => {
    try {
      const session = await getSession();
      newSocket.emit("join", { email: session?.user?.email });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    newSocket.on("successConnection", (val) => {
      console.log(val);
    });
    fetchSession(newSocket);
    setSocket(newSocket);
  }, []);

  return { socket };
};

export default useSocket;
