import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number;
  productName: string;
  productDesc: string;
  price: number;
  qty: number;
  image?: string;
  categoryId: number;
  userId: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
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

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${baseUrl}/api/product`, getAuthHeaders());
  return response.data;
});

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: FormData) => {
    const response = await axios.post(`${baseUrl}/api/product`, productData, getAuthHeaders());
    return response.data;`  `
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }: { id: number; productData: FormData }) => {
    const response = await axios.put(`${baseUrl}/api/product/edit/${id}`, productData, getAuthHeaders());
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: number) => {
  await axios.delete(`${baseUrl}/api/product/delete/${id}`, getAuthHeaders());
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {UpdateProduct(state, action: PayloadAction<Product>) {
    const index = state.products.findIndex((product) => product.id === action.payload.id);
    if (index !== -1) {
      state.products[index] = action.payload;
    }
  },},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
