var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Bike = require('./models/bikeModel');
var app = express();

var port = process.env.PORT || 3000;

var db = mongoose.connect('mongodb://localhost/bikeAPI');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bikeRouter = express.Router();
bikeRouter.route('/Bikes')
    .get(function(req, res) {
        var query = {};
        if (req.query.mfg)
            query.mfg = req.query.mfg;
        Bike.find(query, function (err, bikes) {
            if (err)
                res.status(500).send(err);
            else
                res.json(bikes);
        });
    })
    .post(function (req, res) {
        var bike = new Bike(req.body);
        console.log(bike);
        bike.save();
        res.status(201).send(bike);
    });

bikeRouter.route('/Bikes/:id')
    .get(function(req, res) {
        Bike.findById(req.params.id, function (err, bikes) {
            if (err)
                res.status(500).send(err);
            else
                res.json(bikes);
        });
    })

app.use('/api', bikeRouter);

app.get('/', function (req, res) {
    res.send('welcome to my api');
});

app.listen(port, function () {
    console.log('running on PORT: ' + port);
});
