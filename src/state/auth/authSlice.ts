import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "axios";
import { User } from "../../types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, () => {
        console.log("incrementAsync.pending");
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.accessToken = action.payload;
      });
  },
});

export const loginUser = createAsyncThunk("auth/login", async () => {
  const response = await axios.get(requests.createRequestToken, {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzhhODY5NTdjMGUwNTYyMmU1NDgxNjY4YjJhZTEwOCIsInN1YiI6IjY1ODE0OWI5MDA1MDhhMDlhNTE2MWJiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xpNVfvHot6tvSygGl653pCIQIY_hNZqmjWlyF4Z_ar0",
    },
  });
  const data = await response.data;
  return data;
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
