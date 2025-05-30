const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  id: Number,
  title : String,
  details: String,
  eventDay: String,
  startTime : String,
  endTime : String,
  eventMode: {type: String, enum : ["Online", "Offline"]},
  location: String,
  price: Number,
  image: String,
  hostedBy: String,
  speakers: [
    {
      name: String,
      title: String,
      photo: String
    }
  ],
  additionalInfo: {
    type: mongoose.Schema.Types.Mixed,
    default: {},  
  },

  tags: [{ type: String }],
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
