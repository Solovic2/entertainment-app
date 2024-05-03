import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { ApiMovie, ApiPayload, MovieState } from "../../types";

interface fetchParams {
  searchQuery?: string;
  page: number;
}

const initialState: MovieState = {
  loading: false,
  movieList: [],
  searchResults: [],
  searchError: "",
  searchLoading: false,
  page: 1,
  movieListError: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
  },
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
        }
      )
      .addCase(fetchMovieMedia.rejected, (state) => {
        state.loading = false;
        state.movieListError = "Error Fetching Movie";
      });
    builder
      .addCase(fetchSearchMedia.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(
        fetchSearchMedia.fulfilled,
        (state, action: PayloadAction<ApiPayload>) => {
          state.searchLoading = false;
          state.searchResults = action.payload.results.map((item: ApiMovie) => {
            return { ...item, movie_type: "movie" };
          });
        }
      )
      .addCase(fetchSearchMedia.rejected, (state) => {
        state.searchLoading = false;
        state.searchError = "Error Fetching Search";
      });
  },
});

export const fetchMovieMedia = createAsyncThunk(
  "movie/fetchMovieMedia",
  async (page: number): Promise<any> => {
    const response = await axios.get(requests.fetchMovies, {
      params: {
        include_adult: "true",
        language: "en-US",
        page: page + 1,
      },
    });

    const data: Promise<any> = await response.data;
    return data;
  }
);
export const fetchSearchMedia = createAsyncThunk(
  "movie/fetchSearchMedia",
  async (search: string): Promise<any> => {
    const response = await axios.get(requests.fetchSearchMovies, {
      params: {
        query: search,
        include_adult: "true",
        language: "en-US",
        page: "1",
      },
    });
    const data: Promise<any> = await response.data;
    return data;
  }
);

export const { incrementPage } = movieSlice.actions;
export default movieSlice.reducer;
