import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (storeId) => {
  const response = await fetch(`http://localhost:3000/categories/store/${storeId}`);
  const data = await response.json();
  return data;
});
export const fetchTotalCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await fetch(`http://localhost:3000/categories`);
  const data = await response.json();
  return data;
});

export const createCategory = createAsyncThunk('categories/createCategory', async (categoryData) => {
  const response = await fetch('http://localhost:3000/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });
  const data = await response.json();
  return data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {
  const response = await fetch(`http://localhost:3000/categories/${categoryId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (category) => {
  const response = await fetch(`http://localhost:3000/categories/${category.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  const data = await response.json();
  return data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((category) => category.id !== action.payload.id);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((category) =>
          category.id === action.payload.id ? action.payload : category
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
