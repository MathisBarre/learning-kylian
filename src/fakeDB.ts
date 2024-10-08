const events = [
  {
    id: 1,
    name: "Event 1",
    description: "Description of event 1",
    date: "2023-01-01",
    remainingNbOfTickets: 10,
  },
  {
    id: 2,
    name: "Event 2",
    description: "Description of event 2",
    date: "2023-01-02",
    remainingNbOfTickets: 3,
  },
  {
    id: 3,
    name: "Event 3",
    description: "Description of event 3",
    date: "2023-01-03",
    remainingNbOfTickets: 43,
  },
];

const users = [
  {
    id: 1,
    email: "user1@example.com",
  },
  {
    id: 2,
    email: "user2@example.com",
  },
];

export const postgresql = {
  query: (sql: string, params?: any): any => {
    console.log("Fake DB");
    console.log("Query: ", sql, params);

    if (sql === "SELECT * FROM events") {
      return events;
    }

    if (sql === "SELECT * FROM events WHERE id = ?") {
      const eventId = params.id;
      return events.find((event) => event.id === eventId);
    }

    if (sql === "UPDATE events SET remainingNbOfTickets = ? WHERE id = ?") {
      const { remainingNbOfTickets, eventId } = params;

      const eventIndex = events.findIndex((event) => event.id === eventId);
      if (eventIndex === -1) {
        return;
      }

      events[eventIndex].remainingNbOfTickets = remainingNbOfTickets;
    }

    if (sql === "SELECT * FROM users") {
      return users;
    }

    if (sql === "SELECT * FROM users WHERE id = ?") {
      const userId = params.id;
      return users.find((user) => user.id === userId);
    }
  },
};
