const pool = require("../db/db");
const { BadRequestError, NotFoundError } = require("../errors");
const upload = require("../helper/upload");

// Create a new product
const createProduct = (req, res, next) => {
 
      const { categoryId, name, price,image } = req.body;

      if (!categoryId || !name || !image || !price) {
        next(new BadRequestError("Please provide all inputs!"));
        return;
      }

      // Check if the category with the given categoryId exists
      const categoryQuery = "SELECT id FROM categories WHERE id = ?";
      pool.query(categoryQuery, [categoryId], (categoryError, categoryResults) => {
        if (categoryError) {
          next(new BadRequestError("Error checking category existence"));
        } else if (categoryResults.length === 0) {
          next(new NotFoundError(`Category with ID ${categoryId} not found`));
        } else {
          const query = "INSERT INTO products (category_id, name, image, price) VALUES (?, ?, ?, ?)";
          pool.query(query, [categoryId, name, image, price], (error, results) => {
            if (error) {
              console.error('Error creating a new product:', error);
              next(new BadRequestError("Error creating a new product"));
            } else {
              res.status(201).json({ message: "Product created successfully" });
            }
          });
        }
      });
    }


// Get all products for a category
const getAllProducts = (req, res,next) => {
  const { categoryId } = req.params;

  const query = "SELECT * FROM products WHERE category_id = ?";
  pool.query(query, [categoryId], (error, results) => {
    if (error) {
      next( new NotFoundError(`No products found!`))
    } else {
      res.status(200).json(results);
    }
  });
};
// Get all Total products
const getTotalAllProducts = (req, res,next) => {
  const { categoryId } = req.params;

  const query = "SELECT * FROM products";
  pool.query(query, [], (error, results) => {
    if (error) {
      next( new NotFoundError(`No products found!`))
    } else {
      res.status(200).json(results);
    }
  });
};

// Get a single product
const getSingleProduct = (req, res, next) => {
  const { productId } = req.params;

  const query = "SELECT * FROM products WHERE id = ?";
  pool.query(query, [productId], (error, results) => {
    if (error) {
      next(new NotFoundError(`Error retrieving product from the database!`));
    } else if (results.length === 0) {
      next(new NotFoundError(`Product with ID ${productId} not found!`));
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Delete a product
const deleteProduct = (req, res,next) => {
  const { productId } = req.params;

  const query = "DELETE FROM products WHERE id = ?";
  pool.query(query, [productId], (error, results) => {
    if (error) {
      next( new NotFoundError(`Error deleting product from the database!`))
    } else if (results.affectedRows === 0) {
      next( new NotFoundError(`Product with ID ${productId} not found!`))
    } else {
      res.status(200).json({ message: "Product deleted successfully" });
    }
  });
};

// Update a product
const updateProduct = (req, res,next) => {
  const { productId } = req.params;
  const { categoryId, name, image, price } = req.body;


  if(!name || !categoryId || !productId){
     next(new BadRequestError("Error: name or Category Id or !product Id must be provided"));
  }

  let query;
  let queryParams = [categoryId, name, price,productId];

  if (!image || image === "") {
    query = "UPDATE products SET category_id = ?, name = ?,price=? WHERE id = ?";
  } else {
    query = "UPDATE products SET category_id = ?, name = ?, image = ?, price = ? WHERE id = ?";
    queryParams = [categoryId, name,image,price, productId];
  }

  pool.query(query, queryParams, (error, results) => {
    if (error) {
      next( new NotFoundError(`Error updating product in the database!`))
    } else if (results.affectedRows === 0) {
      next( new NotFoundError(`Product with ID ${productId} not found!`))
    } else {
      res.status(200).json({ message: "Product updated successfully" });
    }
  });
};

module.exports = { createProduct, getAllProducts,getSingleProduct, deleteProduct, updateProduct,getTotalAllProducts };
