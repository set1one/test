const { Schema, model } = require("mongoose");

const InfoSchema = new Schema({
  ignored: { type: Number, unique: false, required: true },
  reported: { type: Number, unique: false, required: true },
});

module.exports = model("Info", InfoSchema);
