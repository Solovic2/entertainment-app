import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { ApiMovie, ApiPayload, MovieState } from "../../types";

const initialState: MovieState = {
  loading: false,
  movieList: [],
  movieListError: "",
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
          state.movieList = action.payload.results.map((item: ApiMovie) => {
            return { ...item, movie_type: "movie" };
          });
        }
      )
      .addCase(fetchMovieMedia.rejected, (state) => {
        state.loading = false;
        state.movieListError = "Error Fetching Movie";
      });
  },
});

export const fetchMovieMedia = createAsyncThunk(
  "movie/fetchMovieMedia",
  async (search?: string): Promise<any> => {
    let response;
    if (search) {
      response = await axios.get(requests.fetchSearchMovies, {
        params: {
          query: search,
          include_adult: "true",
          language: "en-US",
          page: "1",
        },
      });
    } else {
      response = await axios.get(requests.fetchMovies, {
        params: {
          include_adult: "true",
        },
      });
    }
    const data: Promise<any> = await response.data;
    return data;
  }
);

export default movieSlice.reducer;
