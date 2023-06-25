const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
  updateCategory,
  getTotalAllCategories
} = require("../controllers/categories");

router.route("/").get(getTotalAllCategories).post(createCategory);
router.route("/:categoryId").get(getSingleCategory).delete(deleteCategory).put(updateCategory);
router.route("/store/:storeId").get(getAllCategories);

module.exports = router;
