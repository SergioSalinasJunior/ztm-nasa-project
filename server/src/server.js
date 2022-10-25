//common way
//const express = require('express');
//const app = express();
//app.listen();

const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const {loadPlanetsData} = require('./models/planets.model')

//use a different port than the react ap is using. Check if there is a specified port already
const PORT = process.env.PORT || 8000;

// Update below to match your own MongoDB connection string.
const MONGO_URL = 'mongodb+srv://nasa-api:zYXF1Xq1RMj4bzX3@nasa-cluster.fwjaquz.mongodb.net/?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

//what handles our request?
const server = http.createServer(app);

async function startServer() {

    await mongoose.connect(MONGO_URL);

    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();

