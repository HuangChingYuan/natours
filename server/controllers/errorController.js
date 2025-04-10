const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `無效的 ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `重複的欄位值 ${value} 請使用其他值`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `輸入資料無效 ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError("令牌無效 請重新登入", 401);

const handleJWTExpiredError = () =>
  new AppError("您的令牌已過期 請重新登入", 401);

const sendErrorDev = (err, req, res) => {
  // A) 後端
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) 錯誤頁面
  console.error("ERROR 💥", err);
  //   return res.status(err.statusCode).render('error', {
  //     title: 'ERROR 💥',
  //     msg: err.message
  //   });
};

const sendErrorProd = (err, req, res) => {
  // A) 後端
  if (req.originalUrl.startsWith("/api")) {
    // A) 操作錯誤或已知錯誤 向使用者發送訊息
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) 程式錯誤或未知錯誤 不要發送錯誤詳細信息
    // 1) 記錄錯誤
    console.error("ERROR 💥", err);
    // 2) 發送通用訊息
    return res.status(500).json({
      status: "error",
      message: "未知錯誤",
    });
  }

  // B) 錯誤頁面
  // A) 操作錯誤或已知錯誤 向使用者發送訊息
  if (err.isOperational) {
    console.log(err);
    // return res.status(err.statusCode).render('error', {
    //   title: 'Something went wrong!',
    //   msg: err.message
    // });
  }
  // B) 程式錯誤或未知錯誤 不要發送錯誤詳細信息
  // 1) 記錄錯誤
  console.error("ERROR 💥", err);
  // 2) 發送通用訊息
  //   return res.status(err.statusCode).render('error', {
  //     title: 'ERROR 💥',
  //     msg: '請稍後再試'
  //   });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };
  error.message = err.message;

  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === "ValidationError") error = handleValidationErrorDB(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

  sendErrorProd(error, req, res);
};
