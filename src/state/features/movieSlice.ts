import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { ApiMovie, ApiPayload, MovieState, fetchParams } from "../../types";

const initialState: MovieState = {
  loading: false,
  movieList: [],
  searchResults: [],
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalSearchResults: 0,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMovieMedia.fulfilled,
        (state, action: PayloadAction<ApiPayload>) => {
          state.loading = false;
          // Add Movie Type to each one
          const payload = action.payload.results.map((item: ApiMovie) => {
            return { ...item, movie_type: "movie" };
          });
          state.movieList = payload;
          state.currentPage = action.payload.page;
          state.totalPages = action.payload.total_pages;
        }
      )
      .addCase(fetchMovieMedia.rejected, (state) => {
        state.loading = false;
        state.error = "Error Fetching Movie";
      });
    builder
      .addCase(fetchSearchMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSearchMedia.fulfilled,
        (state, action: PayloadAction<ApiPayload>) => {
          state.loading = false;
          const payload = action.payload.results.map((item: ApiMovie) => {
            return { ...item, movie_type: "movie" };
          });
          state.searchResults = payload;
          state.currentPage = action.payload.page;
          state.totalPages = action.payload.total_pages;
          state.totalSearchResults = action.payload.total_results;
        }
      )
      .addCase(fetchSearchMedia.rejected, (state) => {
        state.loading = false;
        state.error = "Error Fetching Search";
      });
  },
});

export const fetchMovieMedia = createAsyncThunk(
  "movie/fetchMovieMedia",
  async (page: number): Promise<any> => {
    const response = await axios.get(requests.fetchMovies, {
      params: {
        include_adult: "false",
        language: "en-US",
        page: page,
      },
    });

    const data: Promise<any> = await response.data;
    return data;
  }
);
export const fetchSearchMedia = createAsyncThunk(
  "movie/fetchSearchMedia",
  async ({ searchQuery, page }: fetchParams): Promise<any> => {
    const response = await axios.get(requests.fetchSearchMovies, {
      params: {
        query: searchQuery,
        include_adult: "false",
        language: "en-US",
        page: page,
      },
    });
    const data: Promise<any> = await response.data;
    return data;
  }
);

export default movieSlice.reducer;
