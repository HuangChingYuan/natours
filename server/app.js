const express = require("express");
const cors = require("cors");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`找不到 的 ${req.originalUrl} `, 404));
});

app.use(globalErrorHandler);

module.exports = app;
