const express = require('express');
const path = require('path');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router');

//fancy listener function for our built in node http server
const app = express();

//chains of middleware that handles req as they come
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(planetsRouter);
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;