import { configureStore } from '@reduxjs/toolkit';
import storeSlice from './storesSlice';
import categoriesSlice from './categoriesSlice';
import productsSlice from './productsSlice';
const store = configureStore({
  reducer: {
    store: storeSlice,
    categories: categoriesSlice,
    products:productsSlice
  },
});

export default store;
