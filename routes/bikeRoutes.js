var express = require('express');

var routes = function (Bike) {

    var bikeRouter = express.Router();

    bikeRouter.route('/')
        .get(function (req, res) {
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

    // create middleware to handle stuff common to every request
    bikeRouter.use('/:id', function (req, res, next) {
        Bike.findById(req.params.id, function (err, bike) {
            if (err) {
                res.status(500).send(err);
            } else if (bike) {
                req.bike = bike;  // store in request for access below
                next(); // go to next step - route below
            } else {
                res.status(404).send('no bike found');
            }
        });
    });

    // assumes bike is found above already, or returned (no bike)
    bikeRouter.route('/:id')
        .get(function (req, res) {
            res.json(req.bike);
        })
        .put(function (req, res) {
            req.bike.mfg = req.body.mfg;
            req.bike.year = req.body.year;
            req.bike.cost = req.body.cost;
            req.bike.ridden = req.body.ridden;
            req.bike.model = req.body.model;
            req.bike.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.bike);
                }
            });
            res.json(req.bike);
        })
        .patch(function (req, res) {
            // for every name/value pair in the req
            // get the name, and put it into the bike object
            // eliminates need for long if/else for each object prop
            // first need to remove the _id which is mongo specific
            if (req.body._id) {
                delete req.body._id;
            };
            for (var name in req.body) {
                req.bike[name] = req.body[name];
            };
            req.bike.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.bike);
                }
            });
        });

    return bikeRouter;
};

module.exports = routes;