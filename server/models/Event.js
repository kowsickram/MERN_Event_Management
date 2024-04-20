const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  Event_name: {
    type: String,
  },
  Desc: {
    type: String,
  },
  Evnt_Type: {
    type: String,
    enum: ["Solo", "Duo", "Group"],
  },
  Slot: {
    type: Number,
    default: 1
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
