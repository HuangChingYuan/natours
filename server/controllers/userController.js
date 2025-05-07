const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

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
  // 如果有上傳圖片，則更新圖片路徑
  // 這裡的 req.file 是 multer 處理後的圖片檔案
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) 取得目前的使用者資料
  const currentUser = await User.findById(req.user.id);

  // 4) 檢查 name, email 是否與原資料相同
  let isSame = true;
  for (const key in filteredBody) {
    if (filteredBody[key] !== currentUser[key]) {
      isSame = false;
      break;
    }
  }

  if (isSame) {
    return next(new AppError("請提供需要更新的姓名或Email", 400));
  }

  // 5) 更改個人資料
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

// 請勿用此更新密碼
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
