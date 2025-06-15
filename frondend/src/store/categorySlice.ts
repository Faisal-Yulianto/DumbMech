import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
  id: number;
  categoryName: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get(`${baseUrl}/api/category`, getAuthHeaders());
  return response.data;
});

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData: { categoryName: string }) => {
    const response = await axios.post(`${baseUrl}/api/category`, categoryData, getAuthHeaders());
    return response.data;
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, categoryData }: { id: number; categoryData: { categoryName: string } }) => {
    const response = await axios.put(`${baseUrl}/api/category/edit/${id}`, categoryData, getAuthHeaders());
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id: number) => {
  await axios.delete(`${baseUrl}/api/category/delete/${id}`, getAuthHeaders());
  return id;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {UpdateCategory(state, action: PayloadAction<Category>) {
    const index = state.categories.findIndex((category) => category.id === action.payload.id);
    if (index !== -1) {
      state.categories[index] = action.payload;
    }
  },},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })    
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
