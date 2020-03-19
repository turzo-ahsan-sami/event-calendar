'use strict';

const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const socket = require('socket.io');

const app = express();
const port = process.env.PORT || 6060;

// routes
const eventsRouter = require('./routes/events.route');
const usersRouter = require('./routes/users.route');

app.use(cors());
app.use(express.json());

// client
app.use('/', express.static('../client/build'));

// api end points
const eventsApi = app.use('/api/events', eventsRouter);
app.use('/api/users', usersRouter);



// mongo connection
require('dotenv').config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("...mongodb connected...");
});


// server start
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});


// socket function
const getApiAndEmit = async socket => {
    try {
        const res = await axios.get('http://127.0.0.1:6060/api/events');
        socket.emit('events', res.data);
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

// socket setup
const io = socket(server);
let interval;
io.on('connection', socket => {
    console.log(`socket connected, id = ${socket.id}`);
    if (interval) clearInterval(interval);
    interval = setInterval(() => getApiAndEmit(socket), 1000);
})
