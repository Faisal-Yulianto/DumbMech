import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import { RootState } from "../../src/store/store";

interface Profile {
  phone: string;
  gender: string;
  address: string;
  image: string | null;
  user: {
    username: string;
    email: string;
  };
}

interface ProfileState {
  email: any;
  data: Profile | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  status: "idle",
  error: null,
  email: undefined
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface TokenPayload {
  userId: number;
  exp: number;
}

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("User token not found.");
      }
      const decoded = jwtDecode<TokenPayload>(token);
      const { userId } = decoded;

      const response = await axios.get<Profile>(`${baseUrl}/api/profile/${userId}`, {
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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {UpdateProfile(state, action: PayloadAction<Profile>) {
    state.data = { ...state.data, ...action.payload };
  },},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export const { UpdateProfile } = profileSlice.actions;
export default profileSlice.reducer;
export const selectProfile = (state: RootState) => state.profiles; 
