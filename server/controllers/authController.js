// const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  // 從輸出中刪除密碼
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) 檢查電子信箱和密碼是否存在
  if (!email || !password) {
    return next(new AppError("請提供電子信箱和密碼", 400));
  }
  // 2) 檢查使用者是否存在 密碼是否正確
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("信箱或密碼不正確", 401));
  }

  // 3) 如果一切正常 則將令牌發送給客戶端
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) 取得令牌並檢查其是否存在
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("尚未登入", 401));
  }

  // 2) 驗證令牌
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) 檢查用戶是否仍然存在
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("使用者不存在", 401));
  }

  // 4) 檢查使用者在發出令牌後是否更改了密碼
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("請重新登入", 401));
  }

  // 允許進入受保護路線
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// 僅適用於檢查 不會返回錯誤
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) 驗證令牌
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) 檢查使用者帳號是否仍然存在
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) 檢查使用者在發出令牌後是否有更改密碼
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // 登入的使用者資訊
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(new AppError("您無權執行此操作", 403));
    }

    next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) 從資料庫中獲取使用者資料
  const user = await User.findById(req.user.id).select("+password");

  // 2) 檢查目前的密碼是否正確
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("您目前的密碼錯誤", 401));
  }

  // 3) 如果是 則更新密碼
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate 將無法如預期運作 // A) 這是因為它不會觸發密碼的預設驗證 B) 它不會觸發密碼的雜湊

  // 4) 使用者登入 發送令牌
  createSendToken(user, 200, res);
});
