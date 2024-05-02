import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { ApiMovie, ApiPayload, MovieState } from "../../types";

const initialState: MovieState = {
  loading: false,
  movieList: [],
  movieListError: "",
};

const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTvMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTvMedia.fulfilled,
        (state, action: PayloadAction<ApiPayload>) => {
          state.loading = false;
          // Add Movie Type to each one as TV
          state.movieList = action.payload.results.map((item: ApiMovie) => {
            return { ...item, movie_type: "tv" };
          });
        }
      )
      .addCase(fetchTvMedia.rejected, (state) => {
        state.loading = false;
        state.movieListError = "Error Fetching Movie";
      });
  },
});

export const fetchTvMedia = createAsyncThunk(
  "tv/fetchTvMedia",
  async (search?: string): Promise<any> => {
    let response;
    if (search) {
      response = await axios.get(requests.fetchSearchTV, {
        params: {
          query: search,
          include_adult: "false",
          language: "en-US",
          page: "1",
        },
      });
    } else {
      response = await axios.get(requests.fetchTV);
    }
    const data: Promise<any> = await response.data;
    return data;
  }
);

export default tvSlice.reducer;
