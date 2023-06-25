const pool = require("../db/db");
const { BadRequestError, NotFoundError } = require("../errors");
const upload = require("../helper/upload");

// Create a new category
const createCategory = (req, res, next) => {
 
      const { storeId, name,image } = req.body;

      if (!storeId || !name || !image) {
        next(new BadRequestError("Please provide all inputs!"));
        return;
      }
      // Check if the store with the given storeId exists
      const storeQuery = "SELECT id FROM stores WHERE id = ?";
      pool.query(storeQuery, [storeId], (storeError, storeResults) => {
        if (storeError) {
          next(new BadRequestError("Error checking store existence"));
        } else if (storeResults.length === 0) {
          next(new NotFoundError(`Store with ID ${storeId} not found`)); 
        } else {
          const query = "INSERT INTO categories (store_id, name, image) VALUES (?, ?, ?)";
          pool.query(query, [storeId, name, image], (error, results) => {
            if (error) {
              console.error('Error creating a new category:', error);
              next(new BadRequestError("Error creating a new category"));
            } else {
              res.status(201).json({ message: "Category created successfully" });
            }
          });
        }
      });
    }





// Get all categories for a store
const getAllCategories = (req, res,next) => {
  const { storeId } = req.params;

  const query = "SELECT * FROM categories WHERE store_id = ?";
  pool.query(query, [storeId], (error, results) => {
    if (error) {
      next( new NotFoundError(`No categories found!`))
    } else {
      res.status(200).json(results);
    }
  });
};

// Get a single category
const getSingleCategory = (req, res, next) => {
  const { categoryId } = req.params;

  const query = "SELECT * FROM categories WHERE id = ?";
  pool.query(query, [categoryId], (error, results) => {
    if (error) {
      next(new NotFoundError(`Error retrieving category from the database!`));
    } else if (results.length === 0) {
      next(new NotFoundError(`Category with ID ${categoryId} not found!`));
    } else {
      res.status(200).json(results[0]);
    }
  });
};



// Delete a category
const deleteCategory = (req, res,next) => {
  const { categoryId } = req.params;

  const query = "DELETE FROM categories WHERE id = ?";
  pool.query(query, [categoryId], (error, results) => {
    if (error) {
      next( new NotFoundError(`Error deleting category from the database!`))
    } else if (results.affectedRows === 0) {
      next( new NotFoundError(`Category with ID ${categoryId} not found!`))
    } else {
      res.status(200).json({ message: "Category deleted successfully" });
    }
  });
};

// Update a category
  const updateCategory = (req, res, next) => {
    const { categoryId } = req.params;
    const { storeId, name, image } = req.body;

    if (!name || !storeId) {
       next(new BadRequestError("Error: name or store must be provided"));
    }

    let query;
    let queryParams = [storeId, name, categoryId];

    if (!image || image === "") {
      query = "UPDATE categories SET store_id = ?, name = ? WHERE id = ?";
    } else {
      query = "UPDATE categories SET store_id = ?, name = ?, image = ? WHERE id = ?";
      queryParams = [storeId, name,image, categoryId];
    }

    pool.query(query, queryParams, (error, results) => {
      if (error) {
         next(new NotFoundError("Error updating category in the database!"));
      }

      if (results.affectedRows === 0) {
         next(new NotFoundError(`Category with ID ${categoryId} not found!`));
      }

      res.status(200).json({ message: "Category updated successfully" });
    });
  };


module.exports = { createCategory, getAllCategories,getSingleCategory, deleteCategory, updateCategory };
