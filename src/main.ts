import express from "express";
import { sendgrid } from "./fakeMailing";
import { postgresql } from "./fakeDB";

const app = express();

// Ability receive POST request with JSON body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/events", (req, res) => {
  res.json(postgresql.query("SELECT * FROM events"));
});

app.post("/order-tickets", async (req, res) => {
  try {
    const { userId, eventId, quantity } = req.body;

    const event:
      | {
          id: number;
          name: string;
          description: string;
          date: string;
          remainingNbOfTickets: number;
        }
      | undefined = postgresql.query("SELECT * FROM events WHERE id = ?", {
      id: eventId,
    });

    if (event) {
      if (event.remainingNbOfTickets > quantity) {
        const remainingNbOfTickets = event.remainingNbOfTickets - quantity;

        postgresql.query(
          "UPDATE events SET remainingNbOfTickets = ? WHERE id = ?",
          {
            remainingNbOfTickets,
            eventId,
          }
        );

        const user: { id: number; email: string } | undefined =
          postgresql.query("SELECT * FROM users WHERE id = ?", {
            id: userId,
          });

        if (user) {
          sendgrid.setApiKey("SG.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

          await sendgrid.send({
            to: user.email,
            from: "orders@example.com",
            subject: "Your order",
            text: `You successfully ordered ${quantity} tickets for ${event.name}. There is ${remainingNbOfTickets} remaining tickets for ${event.name}. Tell your friends!`,
          });
        } else {
          console.error("User not found, cannot send email");
        }

        res.json({
          message: `You ordered ${quantity} tickets for ${event.name} successfully !`,
        });
      } else {
        res.status(400).json({ message: "Not enough tickets" });
      }
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "An error occured";
    res.status(500).json({ message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
