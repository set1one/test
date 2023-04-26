const EventModel = require("../models/event-model.js");
const InfoModel = require("../models/info-model.js");

class EventService {
  async getEvents() {
    const allEvents = await EventModel.find();

    return allEvents;
  }

  async createEvent(name, timestamp, severity) {
    const newEvent = await EventModel.create({ name, timestamp, severity });

    return newEvent;
  }

  async ignoreEvent(id) {
    const deleteEvent = await EventModel.findByIdAndDelete(id);
    const info = await InfoModel.findOne();
    const actualInfo = await InfoModel.findOneAndUpdate({}, { ignored: info.ignored + 1 });

    return actualInfo;
  }

  async removeEvent(id) {
    const deleteEvent = await EventModel.findByIdAndDelete(id);
    const info = await InfoModel.findOne();
    const actualInfo = await InfoModel.findOneAndUpdate({}, { reported: info.reported + 1 });

    return actualInfo;
  }

  async getInfo() {
    const info = await InfoModel.findOne();

    return info;
  }
}

module.exports = new EventService();
