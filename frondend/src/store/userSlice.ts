import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../src/store/store";
import {jwtDecode} from "jwt-decode";

interface User {
  id: number;
  username: string;
  email: string;
}

interface UserState {
  [x: string]: any;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

interface TokenPayload {
  userId: number;
  exp: number;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("User token not found.");
      }
      const decoded = jwtDecode<TokenPayload>(token);
      const { userId } = decoded;

      const response = await axios.get<User>(`${baseUrl}/api/auth/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Fetched Profile Data:", response.data);

      return response.data;
    } catch (error: any) {
      console.error("Error fetching profile data:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;
