const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct
} = require("../controllers/products");

router.route("/").post(createProduct);
router.route("/:productId").get(getSingleProduct).delete(deleteProduct).put(updateProduct);
router.route("/category/:categoryId").get(getAllProducts);

module.exports = router;
