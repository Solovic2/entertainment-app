import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { ApiMovie, ApiPayload, MovieState, fetchParams } from "../../types";

const initialStateTvSlice: MovieState = {
  loading: false,
  movieList: [],
  searchResults: [],
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalSearchResults: 0,
};

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
        (state, action: PayloadAction<ApiPayload>) => {
          state.loading = false;
          // Add Movie Type to each one
          const payload = action.payload.results.map((item: ApiMovie) => {
            return { ...item, movie_type: "tv" };
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
    builder
      .addCase(fetchSearchTv.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSearchTv.fulfilled,
        (state, action: PayloadAction<ApiPayload>) => {
          state.loading = false;
          const payload = action.payload.results.map((item: ApiMovie) => {
            return { ...item, movie_type: "tv" };
          });
          state.searchResults = payload;
          state.currentPage = action.payload.page;
          state.totalPages = action.payload.total_pages;
          state.totalSearchResults = action.payload.total_results;
        }
      )
      .addCase(fetchSearchTv.rejected, (state) => {
        state.loading = false;
        state.error = "Error Fetching Search";
      });
  },
});

export const fetchTvMedia = createAsyncThunk(
  "tv/fetchTvMedia",
  async (page: number): Promise<any> => {
    const response = await axios.get(requests.fetchTV, {
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
export const fetchSearchTv = createAsyncThunk(
  "tv/fetchSearchTv",
  async ({ searchQuery, page }: fetchParams): Promise<any> => {
    const response = await axios.get(requests.fetchSearchTV, {
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

export default tvSlice.reducer;
