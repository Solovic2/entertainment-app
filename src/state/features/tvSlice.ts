import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { Media } from "../../types";

export interface TVState {
  loading: boolean;
  movieList: Media[];
  error: string | null;
  currentPage: number;
  totalPages: number;
}
const initialStateTvSlice: TVState = {
  loading: false,
  movieList: [],
  error: null,
  totalPages: 1,
  currentPage: 1,
};
export interface ApiTvPayload {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}
const tvSlice = createSlice({
  name: "tv",
  initialState: initialStateTvSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTvMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTvMedia.fulfilled,
        (state, action: PayloadAction<ApiTvPayload>) => {
          state.loading = false;
          // Add Movie Type to each one
          const payload = action.payload.results.map((item: Media) => {
            return { ...item, media_type: "tv" };
          });
          state.movieList = payload;
          state.currentPage = action.payload.page;
          state.totalPages = action.payload.total_pages;
        }
      )
      .addCase(fetchTvMedia.rejected, (state) => {
        state.loading = false;
        state.error = "Error Fetching Movie";
      });
  },
});

export const fetchTvMedia = createAsyncThunk(
  "tv/fetchTvMedia",
  async (page: number): Promise<ApiTvPayload> => {
    const response = await axios.get(requests.fetchTV, {
      params: {
        include_adult: "false",
        language: "en-US",
        page: page,
      },
    });

    const data: Promise<ApiTvPayload> = await response.data;
    return data;
  }
);

export default tvSlice.reducer;
