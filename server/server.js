const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 6060;

app.use(cors());
app.use(express.json());

// mongo connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("...mongodb connected...");
});

// routes
const eventsRouter = require('./routes/events.route');
const usersRouter = require('./routes/users.route');

app.get('/', (req, res) => res.send('event calender running'));
app.use('/api/events', eventsRouter);
app.use('/api/users', usersRouter);


// app listen
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});