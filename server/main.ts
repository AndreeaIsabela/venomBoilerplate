const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const serverPort = 3000;
const mongoose = require('mongoose');
const mainRouter = require('./routes/main');

mongoose.connect('mongodb://localhost:27017');

app.use(bodyParser.json());
// file server with express that serves files from node_modules
app.use(express.static(path.join(__dirname, '../node_modules'), {
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(express.static(path.join(__dirname, '../client'), {
  maxAge: 24 * 60 * 60 * 1000
}));

const RouterMain = mainRouter;
app.use(RouterMain);

app.listen(serverPort, () => {
  console.log(`listening on port ${serverPort}`);
});