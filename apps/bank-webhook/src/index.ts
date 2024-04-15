import express from "express";
import db from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  // Update balance in db, add txn
  try {
    const onRampTransaction = await db.onRampTransaction.findFirst({
      where: {
        token: paymentInformation.token,
      },
    });
    if (!onRampTransaction) {
      res.json({
        message: "Error, transaction not found",
      });
    }

    await db.$transaction([
      db.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
      }),
      db.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
      db.transaction.update({
        where: {
          id: onRampTransaction?.transactionId,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.get("/hdfcWebhook", async (req, res) => {
  res.json({ message: "Webhook working" });
});

app.listen(3003);
