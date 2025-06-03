const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const { initializeDatabase } = require("./db/db.connect");
const Events = require("./models/event.models");
const fs = require("fs"); 
// const jsonData = fs.readFileSync("events.json", "utf-8");
const path = require("path");
const jsonPath = path.join(__dirname, "events.json");
const jsonData = fs.readFileSync(jsonPath, "utf-8");
const EventData = JSON.parse(jsonData);

initializeDatabase();

function seedData() {
  try {
    for (const event of EventData) {
      const newEventData = new Events({
        id: event.id,
        title: event.title,
        details: event.details,
        eventDay: event.eventDay,
        startTime: event.startTime,
        endTime: event.endTime,
        eventMode: event.eventMode,
        location: event.location,
        price: event.price,
        image: event.image,
        hostedBy: event.hostedBy,
        speakers: event.speakers,
        additionalInfo: event.additionalInfo,
        tags: event.tags,
      });
      newEventData.save();
    }
  } catch (error) {
    console.log("Not able to seed Data.");
  }
}
seedData();

app.get('/favicon.ico', (req, res) => res.status(204).end());

async function addNewEvent(event) {
  try {
    const newEvent = new Events(event);
    const saveEvent = await newEvent.save();
    return saveEvent;
  } catch (error) {
    console.error("Error while saving book:", error.message);
    throw error;
  }
}

app.post('/events', async (req, res) => {
    try {
        const selectedEvent = await addNewEvent(req.body)
        if (selectedEvent) {
            res.status(200).json({ message: "Event added successfully.", event: selectedEvent });
        } else {
            res.status(404).json({ message: "Failed to add event.", event: selectedEvent });

        }
    } catch (error) {
        res.status(500).json({error : "Server error."})
    }
})

const readAllEvents = async () =>{
try {
    const allEvents = await Events.find();
    return allEvents
} catch (error) {
    throw error
}
}

app.get('/events', async (req, res) => {
    try {
    const allEvents = await readAllEvents();
    if (allEvents) {
      res.json(allEvents);
    } else {
      res.status(404).json({ error: "No Event found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Events." });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
