var express = require('express');
var bodyParser = require('body-parser');
var Bike = require('./models/bikeModel');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bikeRouter = express.Router();
bikeRouter.route('/Bikes')
    .get(function(req, res) {
        var bike = new Bike({
            "mfg": "Specialized",
            "model": "Stumpjumper Carbon Expert 6Fattie",
            "cost": 5000,
            "ridden": true});
        res.json(bike);
    })
    .post(function (req, res) {
        var bike = new Bike(req.body);
        console.log(bike);
        res.send(bike);
    });

app.use('/api', bikeRouter);

app.get('/', function (req, res) {
    res.send('welcome to my api');
});

app.listen(port, function () {
    console.log('running on PORT: ' + port);
});
