const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) 如果使用者發布密碼數據 則建立錯誤
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("不適用於更改密碼", 400));
  }

  // 2) 篩選掉不允許更新和不需要的欄位
  const filteredBody = filterObj(req.body, "name", "email");

  // 3) 更改個人資料
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "請使用新的註冊頁面",
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

exports.updateUser = factory.updateOne(User); // 請勿用此更新密碼
exports.deleteUser = factory.deleteOne(User);
