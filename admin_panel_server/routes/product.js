const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getTotalAllProducts
} = require("../controllers/products");

router.route("/").get(getTotalAllProducts).post(createProduct);
router.route("/:productId").get(getSingleProduct).delete(deleteProduct).put(updateProduct);
router.route("/category/:categoryId").get(getAllProducts);

module.exports = router;
