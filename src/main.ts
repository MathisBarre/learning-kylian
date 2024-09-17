import express from "express";
import { fakeDb } from "./fakeDb";

const app = express();

// Ability receive POST request with JSON body
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/events", (req, res) => {
  res.json(fakeDb.query("SELECT * FROM events"));
});

app.post("/order-tickets", (req, res) => {
  const { eventId, quantity } = req.body;

  const events:
    | {
        id: number;
        name: string;
        description: string;
        date: string;
        remainingNbOfTickets: number;
      }[]
    | undefined = fakeDb.query("SELECT * FROM events WHERE id = ?", {
    id: eventId,
  });

  if (!events || events.length === 0) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  const event = events[0];

  if (event.remainingNbOfTickets < quantity) {
    res.status(400).json({ message: "Not enough tickets" });
    return;
  }

  const remainingNbOfTickets = event.remainingNbOfTickets - quantity;

  fakeDb.query("UPDATE events SET remainingNbOfTickets = ? WHERE id = ?", {
    remainingNbOfTickets,
    eventId,
  });

  res.json({
    message: `You ordered ${quantity} tickets for ${event.name}. There is ${remainingNbOfTickets} remaining tickets`,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
