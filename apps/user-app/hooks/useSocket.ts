import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    newSocket.on("successConnection", (val) => {
      console.log(val);
    });
    setSocket(newSocket);
  }, []);

  return { socket };
};

export default useSocket;
