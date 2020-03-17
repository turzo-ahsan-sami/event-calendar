const router = require('express').Router();
let Event = require('../models/event.model');
const { getEventsByDate } = require('../controllers/event.controller');

router.route('/').get((req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json(`error : ${err}`));
});

router.get('/', getEventsByDate);

router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
        .then(events => res.json(events))
        .catch(err => res.status(400).json(`error : ${err}`));
});


router.route('/delete/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('event deleted'))
        .catch(err => res.status(400).json(`error : ${err}`));
});


router.route('/add').post((req, res) => {
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
});


router.route('/update/:id').post((req, res) => {
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
});





module.exports = router;

