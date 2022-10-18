const express = require('express');

//fancy listener function for our built in node http server
const app = express();

app.use(express.json());

module.exports = app;