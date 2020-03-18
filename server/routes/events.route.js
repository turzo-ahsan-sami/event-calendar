const express = require("express");
const router = express.Router();
const EventController = require('../controllers/event.controller');
const Event = require('../models/event.model');
router.get(`/`, EventController.getEventList);

router.get(`/:id`, EventController.getEventById);

router.get(`/username/:username`, EventController.getEventsByUsername);

router.get(`/daterange`, EventController.getEventsByDaterange);

// router.get(`/daterange`, (req, res) => {
//     console.log(req);
//     const startdate = new Date(req.params.startdate);
//     const enddate = new Date(req.params.enddate);
//     Event.find({date: startdate})
//         .then(events => res.json(events))
//         .catch(err => res.status(400).json(`error : ${err}`));
// });

router.delete(`/delete/:id`, EventController.deleteEvent);

router.post(`/add`, EventController.addEvent);

router.post(`/update/:id`, EventController.updateEvent);

module.exports = router;

