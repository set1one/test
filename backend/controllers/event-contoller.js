const EventService = require("../services/event-service.js");

class EventController {
  async getEvents(req, res, next) {
    try {
      const data = await EventService.getEvents();

      return res.json(data);
    } catch (e) {
      console.log(e);
    }
  }

  async createEvent(req, res, next) {
    try {
      const { name, timestamp, severity } = req.body;
      const data = await EventService.createEvent(name, timestamp, severity);

      return res.json(data);
    } catch (e) {
      console.log(e);
    }
  }

  async ignoreEvent(req, res, next) {
    try {
      const { id } = req.body;
      const data = await EventService.ignoreEvent(id);

      return res.json(data);
    } catch (e) {
      console.log(e);
    }
  }

  async removeEvent(req, res, next) {
    try {
      const { id } = req.body;
      const data = await EventService.removeEvent(id);

      return res.json(data);
    } catch (e) {
      console.log(e);
    }
  }

  async getInfo(req, res, next) {
    try {
      const data = await EventService.getInfo();

      return res.json(data);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new EventController();
