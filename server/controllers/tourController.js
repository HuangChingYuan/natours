const Tour = require("./../models/tourModel");
const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: "reviews" });

exports.getTourByslug = catchAsync(async (req, res, next) => {
  // 取得旅遊所需的數據（包括評論和導遊）
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });

  if (!tour) {
    return next(new AppError("沒有同名的旅遊行程", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: tour,
    },
  });
});
