import express from "express";
import { fakeDb } from "./fakeDb";

const app = express();

// Ability receive POST request with JSON body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/events", (req, res) => {
  res.json(fakeDb.query("SELECT * FROM events"));
});

app.post("/order-tickets", (req, res) => {
  const { eventId, quantity } = req.body;

  const event:
    | {
        id: number;
        name: string;
        description: string;
        date: string;
        remainingNbOfTickets: number;
      }
    | undefined = fakeDb.query("SELECT * FROM events WHERE id = ?", {
    id: eventId,
  });

  if (event) {
    if (event.remainingNbOfTickets > quantity) {
      const remainingNbOfTickets = event.remainingNbOfTickets - quantity;

      fakeDb.query("UPDATE events SET remainingNbOfTickets = ? WHERE id = ?", {
        remainingNbOfTickets,
        eventId,
      });

      res.json({
        message: `You ordered ${quantity} tickets for ${event.name}. There is ${remainingNbOfTickets} remaining tickets`,
      });
    }
    res.status(400).json({ message: "Not enough tickets" });
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
