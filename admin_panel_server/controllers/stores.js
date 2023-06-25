const upload = require("../helper/upload");
const pool = require("../db/db");
const { BadRequestError, NotFoundError } = require("../errors");


// Create a new store
const createStore = (req, res, next) => {
      const { name,logo, address } = req.body;

      if(!name || !logo || !address){
        next(new BadRequestError("provide all inputs "));
      }

       const query = "INSERT INTO stores (name, logo, address) VALUES (?, ?, ?)";
      pool.query(query, [name, logo, address], (error, results) => {
        if (error) {
          next(new NotFoundError(`Error inserting store into the database!`));
        } else {
          res.status(201).json({ message: "Store created successfully" });
        }
      });
    
};

// Get all stores
const getAllStores = (req, res, next) => {
  const query = "SELECT * FROM stores";
  pool.query(query, (error, results) => {
    if (error) {
      next(new NotFoundError(`No stores found!`));
    } else {
      res.status(200).json(results);
    }
  });
};

// Get a single store
const getSingleStore = (req, res, next) => {
  const { storeId } = req.params;

  const query = "SELECT * FROM stores WHERE id = ?";
  pool.query(query, [storeId], (error, results) => {
    if (error) {
      next(new NotFoundError(`Error retrieving store from the database!`));
    } else if (results.length === 0) {
      next(new NotFoundError(`Store with ID ${storeId} not found!`));
    } else {
      res.status(200).json(results[0]);
    }
  });
}; 

// Delete a store
const deleteStore = (req, res, next) => {
  const { storeId } = req.params;

  const query = "DELETE FROM stores WHERE id = ?";
  pool.query(query, [storeId], (error, results) => {
    if (error) {
      next(new NotFoundError(`Error deleting store from the database!`));
    } else if (results.affectedRows === 0) {
      next(new NotFoundError(`Store with ID ${storeId} not found!`));
    } else {
      res.status(200).json({message: "Store deleted successfully" });
    }
  });
};

// Update a store
const updateStore = (req, res, next) => {
  const { storeId } = req.params;
  const { name, address,logo } = req.body;

  if(!storeId || !name){
    next(new BadRequestError("store id or name has to be provided"));
  }

  let queryParams=[name,address,storeId];
  let query;
  if(!logo || logo==""){
     query = "UPDATE stores SET name = ?, address = ? WHERE id = ?";
  }else{
     query = "UPDATE stores SET name = ?, logo = ?, address = ? WHERE id = ?";
     queryParams=[name,logo,address,storeId];
  }
  
      
      pool.query(query, queryParams, (error, results) => {
        if (error) {
          next(new NotFoundError(`Error updating store in the database!`));
        } else if (results.affectedRows === 0) {
          next(new NotFoundError(`Store with ID ${storeId} not found!`));
        } else {
          res.status(200).json({ message: "Store updated successfully" });
        }
      });
    }



module.exports = { createStore, getAllStores,getSingleStore, deleteStore, updateStore };
