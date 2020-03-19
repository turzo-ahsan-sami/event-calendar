'use strict';

const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const axios = require('axios');

// routes
const eventsRouter = require('./routes/events.route');
const usersRouter = require('./routes/users.route');

const app = express();
const port = process.env.PORT || 6060;

app.use(cors());
app.use(express.json());

// client
app.use('/', express.static('../client/build'));

// api end points
app.use('/api/events', eventsRouter);
app.use('/api/users', usersRouter);


// mongo connection
const ATLAS_URI = 'mongodb+srv://dbAdmin:619%23@cluster0-jut37.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("...mongodb connected...");
});


// server start
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});



// socket setup
const io = socket(server);
let interval;
io.on('connection', socket => {
    console.log(`socket connected, id = ${socket.id}`);
    if (interval) clearInterval(interval);
    interval = setInterval(() => getApiAndEmit(socket), 1000);
})


// socket function
const getApiAndEmit = async socket => {
    try {
        const res = await axios.get('http://127.0.0.1:6060/api/events');
        io.emit('events', res.data);
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};