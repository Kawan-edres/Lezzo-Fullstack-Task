const pool = require("../db/db");
const { BadRequestError, NotFoundError } = require("../errors");


const getStoresPaginated = (req, res, next) => {
  const { page, pageSize } = req.query;
  const pageNumber = parseInt(page);
  const limit = parseInt(pageSize);

  if (!pageNumber || !limit || pageNumber <= 0 || limit <= 0) {
    next(new BadRequestError("Invalid page number or page size"));
    return;
  }

  const offset = (pageNumber - 1) * limit;

  // Query to fetch the total count of stores
  const countQuery = "SELECT COUNT(*) AS total FROM stores";

  // Query to fetch the paginated data
  const dataQuery = "SELECT * FROM stores LIMIT ?, ?";

  pool.query(countQuery, (countError, countResults) => {
    if (countError) {
      next(new NotFoundError("Error retrieving store count from the database!"));
    } else {
      const total = countResults[0].total; // Extract the total count from the result

      // Execute the query to fetch the paginated data
      pool.query(dataQuery, [offset, limit], (dataError, dataResults) => {
        if (dataError) {
          next(new NotFoundError("Error retrieving paginated store data from the database!"));
        } else {
          // Return the paginated data along with the total count
          res.status(200).json({
            pageNumber: pageNumber,
            pageSize: limit,
            total: total,
            data: dataResults
          });
        }
      });
    }
  });
};



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



module.exports = { createStore, getAllStores,getSingleStore, getStoresPaginated, deleteStore, updateStore };
