// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const https = require('https');
const createError = require('http-errors');

// defining the Express app
const app = express();

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
    // mongoose.set('debug', true);
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


const routes = require('./routes')(app);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3001, () => {
  console.log('listening on port 3001');
});