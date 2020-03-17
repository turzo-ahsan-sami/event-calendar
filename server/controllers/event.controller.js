const mongoose = require("mongoose");
const Event = require('../models/event.model');

exports.getEventList = (req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json(`error : ${err}`));
};

exports.getEventById = (req, res) => {
    Event.findById(req.params.id)
        .then(events => res.json(events))
        .catch(err => res.status(400).json(`error : ${err}`));
};

exports.getEventsByUsername = (req, res) => {
    console.log(req.params);
    Event.find({ username: req.params.username})
        .then(events => res.json(events))
        .catch(err => res.status(400).json(`error : ${err}`));
};

exports.deleteEvent = (req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('event deleted'))
        .catch(err => res.status(400).json(`error : ${err}`));
};

exports.addEvent = (req, res) => {
    const username = req.body.username;
    const title = req.body.title;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const newEvent = new Event({
        username,
        title,
        description,
        date,
    });

    newEvent.save()
        .then(() => res.json('event added'))
        .catch(err => res.status(400).json(`error : ${err}`));
};

exports.updateEvent = (req, res) => {
    const username = req.body.username;
    const title = req.body.title;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    Event.findById(req.params.id)
        .then(event => {
            event.username = username;
            event.title = title;
            event.description = description;
            event.date = date;

            event.save()
                .then(() => res.json('event updated'))
                .catch(err => res.status(400).json(`error : ${err}`));
        })
        .catch(err => res.status(400).json(`error : ${err}`));
};


exports.getEventsByDaterange = (req, res) => {
    console.log(req);
    try {
        let { startDate, endDate } = req.query;
        //expected result: YYY-MMM-DDD
        console.log({ startDate, endDate });

        const events = Event.find({
            date: {
                $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                $lt: new Date(new Date(endDate).setHours(23, 59, 59))
            }
        }).sort({ date: 'asc' })

        if (!events) {
            return res.status(404).json({
                status: 'failure',
                message: 'could not retrieve events'
            })
        }

        res.status(200).json({
            status: 'success',
            data: events
        })
    }
    catch (error) {
        return res.status(500).json({
            status: 'failure',
            error: error.message
        })
    }
}