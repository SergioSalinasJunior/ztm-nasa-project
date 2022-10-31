const mongoose = require('mongoose');

// Update below to match your own MongoDB connection string.
const MONGO_URL = 'mongodb+srv://nasa-api:zYXF1Xq1RMj4bzX3@nasa-cluster.fwjaquz.mongodb.net/?retryWrites=true&w=majority';


mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}