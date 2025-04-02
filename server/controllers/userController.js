const User = require("./../models/userModel");
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
const factory = require("./handlerFactory");

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
