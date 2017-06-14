var express = require('express');

var routes = function (Bike) {

    var bikeRouter = express.Router();

    bikeRouter.route('/')
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

    bikeRouter.route('/:id')
        .get(function(req, res) {
            Bike.findById(req.params.id, function (err, bikes) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(bikes);
            });
        });

    return bikeRouter;

};

module.exports = routes;