import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    image: string;
    productName: string;
    price: number;
    qty: number;
    productDesc: string;
  };
}

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
  totalPrice: 0,
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
    userId,
    productId,
    quantity,
  }: {
    userId: number;
    productId: number;
    quantity: number;
  }) => {
    const response = await axios.post(`${baseUrl}/api/cart`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({
    userId,
    productId,
    quantity,
  }: {
    userId: number;
    productId: number;
    quantity: number;
  }) => {
    const response = await axios.put(`${baseUrl}/api/cart/edit`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }: { userId: number; productId: number }) => {
    await axios.delete(`${baseUrl}/api/cart/delete/${userId}/${productId}`);
    return productId;
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (userId: number) => {
    const response = await axios.get(`${baseUrl}/api/cart/${userId}`);
    return response.data;
  }
);

const calculateTotalPrice = (items: CartItem[]) => {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      addToCart.fulfilled,
      (state, action: PayloadAction<CartItem>) => {
        state.status = "succeeded";
        const existingIndex = state.items.findIndex(
          (item) => item.productId === action.payload.productId
        );
        if (existingIndex !== -1) {
          state.items[existingIndex].quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
        state.totalPrice = calculateTotalPrice(state.items);
      }
    );
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to add to cart";
    });

    builder.addCase(updateCartItem.pending, (state) => {
      state.status = "loading";
    });
   builder.addCase(
  updateCartItem.fulfilled,
  (state, action: PayloadAction<CartItem>) => {
    state.status = "succeeded";
    const updatedItem = action.payload;
    const index = state.items.findIndex((item) => item.id === updatedItem.id);
    if (index !== -1) {
      const maxQty = state.items[index].product.qty;
      // Batasi quantity maksimal sesuai stok
      state.items[index].quantity = Math.min(updatedItem.quantity, maxQty);
    }
    state.totalPrice = calculateTotalPrice(state.items);
  }
);


    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to update cart item";
    });

    builder.addCase(removeFromCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      removeFromCart.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (item) => item.productId !== action.payload
        );
        state.totalPrice = calculateTotalPrice(state.items);
      }
    );
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to remove from cart";
    });

    builder.addCase(getCartItems.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload.map((item: any) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        product: {
          image: item.product.image,
          productName: item.product.productName,
          price: item.product.price,
          qty: item.product.qty,
          productDesc: item.product.productDesc
        },
      }));
      state.totalPrice = calculateTotalPrice(state.items);
    });

    builder.addCase(getCartItems.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to fetch cart items";
    });
  },
});

export default cartSlice.reducer;
