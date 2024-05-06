import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { ApiPayload, HomeState, fetchParams } from "../../types";

export const initialStateHomeSlice: HomeState = {
  loading: false,
  trending: [],
  recommending: [],
  searchResults: [],
  trendingError: "",
  recommendingError: "",
  searchLoading: false,
  searchError: "",
  currentPage: 1,
  totalPages: 1,
  totalSearchResults: 0,
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialStateHomeSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMedia.fulfilled,
        (state, action: PayloadAction<ApiPayload>) => {
          state.loading = false;
          state.trending = action.payload.results.slice(0, 5);
          state.recommending = action.payload.results.slice(-15);
        }
      )
      .addCase(fetchMedia.rejected, (state) => {
        state.loading = false;
        state.trendingError = "Error Fetching Trending Movies";
        state.recommendingError = "Error Fetching Trending Movies";
      });
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(
        fetchSearch.fulfilled,
        (state, action: PayloadAction<ApiPayload>) => {
          state.searchLoading = false;
          const payload = action.payload.results.filter(
            (item) => item.media_type !== "person"
          );
          state.searchResults = payload;
          state.currentPage = action.payload.page;
          state.totalPages = action.payload.total_pages;
          state.totalSearchResults =
            action.payload.total_results - payload.length;
        }
      )
      .addCase(fetchSearch.rejected, (state) => {
        state.searchLoading = false;
        state.searchError = "Error Fetching Search";
      });
  },
});

export const fetchMedia = createAsyncThunk(
  "home/fetchMedia",
  async (): Promise<any> => {
    const response = await axios.get(requests.fetchTrending, {
      params: {
        include_adult: "false",
      },
    });
    const data: Promise<any> = await response.data;
    return data;
  }
);
export const fetchSearch = createAsyncThunk(
  "home/fetchSearch",
  async ({ searchQuery, page }: fetchParams): Promise<any> => {
    const response = await axios.get(requests.fetchSearchHome, {
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

export default homeSlice.reducer;
