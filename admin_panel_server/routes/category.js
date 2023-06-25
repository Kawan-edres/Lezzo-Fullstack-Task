const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
  updateCategory
} = require("../controllers/categories");

router.route("/").post(createCategory);
router.route("/:categoryId").get(getSingleCategory).delete(deleteCategory).put(updateCategory);
router.route("/store/:storeId").get(getAllCategories);

module.exports = router;
