const mongoose = require("mongoose");
const User = require('../models/user.model');

exports.getAllUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('error: ' + err));
};

exports.addUser = (req, res) => {
    const username = req.body.username;
    const newUser = new User({ username });
    newUser.save()
        .then(() => res.json('user added'))
        .catch(err => res.status(400).json('error: ' + err));
};