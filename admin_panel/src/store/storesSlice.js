import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStoreData = createAsyncThunk('stores/fetchStores', async () => {
  const response = await fetch("http://localhost:3000/stores");
  const data = await response.json();
  return data;
});

export const fetchPaginatedStoreData = createAsyncThunk(
  'stores/fetchPaginatedStores',
  async ({ pageSize, page }) => {
    const url = `http://localhost:3000/stores/paginated?pageSize=${pageSize}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);


export const submitFormData = createAsyncThunk('stores/submitFormData', async (formData) => {
  const response = await fetch('http://localhost:3000/stores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  return data;
});

export const deleteStore = createAsyncThunk('stores/deleteStore', async (storeId) => {
  const response = await fetch(`http://localhost:3000/stores/${storeId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

export const updateStore = createAsyncThunk('stores/updateStore', async (store) => {
  const response = await fetch(`http://localhost:3000/stores/${store.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store),
  });
  const data = await response.json();
  return data;
});

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    data: [],
    loading: false,
    error: null,
    pageNumber: 1,
    pageSize: 10,
    total: 0, // Add total property to the initial state and set it to 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStoreData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitFormData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitFormData.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((store) => store.id !== action.payload.id);
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((store) =>
          store.id === action.payload.id ? action.payload : store
        );
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPaginatedStoreData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedStoreData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // Update data with the paginated response data
        state.pageNumber = action.payload.pageNumber; // Update pageNumber with the current page number
        state.pageSize = action.payload.pageSize; // Update pageSize with the current page size
        state.total = action.payload.total; // Add total property to the state to store the total number of stores
      })
      .addCase(fetchPaginatedStoreData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default storeSlice.reducer
