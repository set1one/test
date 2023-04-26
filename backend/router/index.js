const Router = require("express").Router;
const EventController = require("../controllers/event-contoller.js");

const router = new Router();

router.get("/events", EventController.getEvents);
router.post("/events", EventController.createEvent);
router.post("/events/ignore", EventController.ignoreEvent);
router.post("/events/report", EventController.removeEvent);
router.get("/info", EventController.getInfo);

module.exports = router;
