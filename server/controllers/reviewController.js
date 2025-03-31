const Review = require("./../models/reviewModel");
const factory = require("./handlerFactory");
// const catchAsync = require('./../utils/catchAsync');

exports.getAllReviews = factory.getAll(Review);
