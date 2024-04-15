export type User = {
  id: number;
  email: string | null;
  name: string | null;
  number: string;
};

export type OnRampTransaction = {
  id: number;
  time: Date;
  amount: number;
  status: string;
  provider: string;
  token: string;
  userId: number;
};

export type Transaction = {
  id: number;
  startTime: Date;
  endTime: Date | null;
  amount: number;
  status: TransactionStatus;
  type: TransactionType;
  senderUserId: number;
  sender: User;
  receiverUserId: number;
  receiver: User;
};

export type TransactionType = "SEND_MONEY" | "TOP_UP";
export type TransactionStatus = "Success" | "Failure" | "Processing";
