const express = require('express');
const planetsRouter = require('./routes/planets/planets.router');
const cors = require('cors');

//fancy listener function for our built in node http server
const app = express();

//chains of middleware that handles req as they come
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(planetsRouter);

module.exports = app;