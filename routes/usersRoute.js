const { Router } = require("express");
const {
  signUp,
  login,
  addProductToUser,
  getAllUsers,
  deleteUser,
} = require("../controller/userController");

const router = new Router();

router.post("/signup", signUp);
router.post("/login", login);
router.put("/:userId/products/:productId", addProductToUser);
router.get("/", getAllUsers);
router.delete("/", deleteUser);

module.exports = router;
