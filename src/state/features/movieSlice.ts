import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { Media } from "../../types";

export interface MovieState {
  loading: boolean;
  movieList: Media[];
  error: string | null;
  currentPage: number;
  totalPages: number;
}
export interface ApiMoviePayload {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}
export const initialStateMovieSlice: MovieState = {
  loading: false,
  movieList: [],
  error: null,
  totalPages: 1,
  currentPage: 1,
};

const movieSlice = createSlice({
  name: "movie",
  initialState: initialStateMovieSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMovieMedia.fulfilled,
        (state, action: PayloadAction<ApiMoviePayload>) => {
          state.loading = false;
          // Add Media Type to each one
          const payload = action.payload.results.map((item: Media) => {
            return { ...item, media_type: "movie" };
          });
          state.movieList = payload;
          state.currentPage = action.payload.page;
          state.totalPages = action.payload.total_pages;
        }
      )
      .addCase(fetchMovieMedia.rejected, (state) => {
        state.loading = false;
        state.error = "Error Fetching Media";
      });
  },
});

export const fetchMovieMedia = createAsyncThunk(
  "movie/fetchMovieMedia",
  async (page: number): Promise<ApiMoviePayload> => {
    const response = await axios.get(requests.fetchMovies, {
      params: {
        include_adult: "false",
        language: "en-US",
        page: page,
      },
    });

    const data: Promise<ApiMoviePayload> = await response.data;
    return data;
  }
);

export default movieSlice.reducer;
