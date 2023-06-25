import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStoreData = createAsyncThunk('stores/fetchStores', async () => {
  const response = await fetch("http://localhost:3000/stores");
  const data = await response.json();
  return data;
});

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
      });
  },
});

export default storeSlice.reducer
