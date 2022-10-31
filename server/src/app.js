const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

//used before versioning
//const planetsRouter = require('./routes/planets/planets.router');
//const launchesRouter = require('./routes/launches/launches.router');

const api = require('./routes/api');

//fancy listener function for our built in node http server
const app = express();

//chains of middleware that handles req as they come
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

//used before versioning
//app.use('/planets', planetsRouter);
//app.use('/launches', launchesRouter);

app.use('/v1', api);
app.get('/*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;