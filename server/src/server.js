//common way
//const express = require('express');
//const app = express();
//app.listen();

const http = require('http');

const app = require('./app');

//use a different port than the react ap is using. Check if there is a specified port already
const PORT = process.env.PORT || 8000;

//what handles our request?
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})

