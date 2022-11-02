//common way
//const express = require('express');
//const app = express();
//app.listen();

const http = require('http');

require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');

//use a different port than the react ap is using. Check if there is a specified port already
const PORT = process.env.PORT || 8000;

//what handles our request?
const server = http.createServer(app);

async function startServer() {

    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchesData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();

