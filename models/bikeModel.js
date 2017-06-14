var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bikeModel = new Schema({
    mfg: {type: String, default: ""},
    model: {type: String, default: ""},
    cost: {type: Number, default: 0},
    year: {type: Number},
    ridden: {type: Boolean, default: false}
});

module.exports = mongoose.model(
    'Bike', bikeModel);