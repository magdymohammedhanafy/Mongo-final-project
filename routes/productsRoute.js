const { Router } = require("express");
const {
  getAllProducts,
  creatProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
} = require("../controller/productsController");
const { authentication } = require("../controller/userController");

const router = new Router();

router.get("/", authentication, getAllProducts);
router.get("/:id", authentication, getOneProduct);
router.post("/", authentication, creatProduct);
router.put("/:id", authentication, updateProduct);
router.delete("/:id", authentication, deleteProduct);

module.exports = router;
