const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
  name: { type: String, required: true },
  timestamp: { type: String, required: true },
  severity: { type: String, required: true },
});

module.exports = model("Event", EventSchema);
