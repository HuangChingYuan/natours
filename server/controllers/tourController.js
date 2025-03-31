const Tour = require("./../models/tourModel");
const factory = require("./handlerFactory");

exports.getAllTours = factory.getAll(Tour);
