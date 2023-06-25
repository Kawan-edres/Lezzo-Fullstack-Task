  // index.js
  const express = require('express');
  const cors = require('cors');
  const pool = require('./db/db');
  
  const app = express();
  const port = 3000;
  app.use(cors({origin:"*"}));
  
  
  const storesRoutes = require('./routes/store');
  const categoriesRoutes = require('./routes/category');
  const productsRoutes = require('./routes/product');
  
  
  const notFoundMiddleware = require('./middleware/not-found');
  const errorHandlerMiddleware = require('./middleware/error-handler');
  
  
  app.use(errorHandlerMiddleware);
  app.use(express.json({ limit: '1000kb' }));
  app.use(express.urlencoded({ extended: true }));

  //routes
  app.use('/api/stores', storesRoutes);
  app.use('/api/categories', categoriesRoutes);
  app.use('/api/products', productsRoutes);
  
  
  //middlewares
  app.use(notFoundMiddleware);


  // db connection and server connection
  pool.getConnection((error, connection) => {
    if (error) {
      console.log('Database connection failed.');
      console.error(error);
      return;
    }
    console.log('Database connected successfully.');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
    connection.release();
  });


