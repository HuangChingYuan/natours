const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

// router.use(authController.isLoggedIn);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// 保護在這中介軟體之後的所有路徑
router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

// 只有管理員可以訪問這些路徑
router.use(authController.restrictTo("admin"));

// 這些路徑需要管理員權限
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
