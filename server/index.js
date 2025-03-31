const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("資料庫連線成功"))
  .catch((err) => console.error("資料庫連線錯誤:", err));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`應用程式在連接埠 ${port} 上運行`);
});
