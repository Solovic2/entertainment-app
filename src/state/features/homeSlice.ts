import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { ApiPayload, HomeState } from "../../types";

const initialState: HomeState = {
  loading: false,
  trending: [],
  recommending: [],
  searchResults: [],
  trendingError: "",
  recommendingError: "",
  searchError: "",
};

const homeSlice = createSlice({
  name: "home",
  initialState,
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
        state.loading = true;
      })
      .addCase(
        fetchSearch.fulfilled,
        (state, action: PayloadAction<ApiPayload>) => {
          state.loading = false;
          state.searchResults = action.payload.results;
        }
      )
      .addCase(fetchSearch.rejected, (state) => {
        state.loading = false;
        state.searchError = "Error Fetching Search";
      });
  },
});

export const fetchMedia = createAsyncThunk(
  "home/fetchMedia",
  async (): Promise<any> => {
    const response = await axios.get(requests.fetchTrending, {
      params: {
        include_adult: "true",
      },
    });
    const data: Promise<any> = await response.data;
    return data;
  }
);
export const fetchSearch = createAsyncThunk(
  "home/fetchSearch",
  async (search: string): Promise<any> => {
    const response = await axios.get(requests.fetchSearchHome, {
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

export default homeSlice.reducer;
