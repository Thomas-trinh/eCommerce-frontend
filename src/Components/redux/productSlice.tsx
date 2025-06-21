import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../interfaces/Products";

interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "failed";
}

const initialState: ProductState = {
  products: [],
  status: "idle",
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await axios.get<Product[]>("http://localhost:4000/api/products");
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteProductLocally(state, action: PayloadAction<number>) {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "idle";
      })
      .addCase(fetchProducts.rejected, state => {
        state.status = "failed";
      });
  },
});

export const { deleteProductLocally } = productSlice.actions;
export default productSlice.reducer;
