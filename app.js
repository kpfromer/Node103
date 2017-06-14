var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Bike = require('./models/bikeModel');
var app = express();

var port = process.env.PORT || 3000;

var db = mongoose.connect('mongodb://localhost/bikeAPI');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

bikeRouter = require('./routes/bikeRoutes')(Bike);

app.use('/api', bikeRouter);

app.get('/', function (req, res) {
    res.send('welcome to my api');
});

app.listen(port, function () {
    console.log('running on PORT: ' + port);
});
