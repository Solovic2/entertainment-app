import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { Media, MultiMedia } from "../../types";

export interface HomeState {
  loading: boolean;
  trending: Media[];
  recommending: Media[];
  trendingError: string;
  recommendingError: string;
}
export const initialStateHomeSlice: HomeState = {
  loading: false,
  trending: [],
  recommending: [],
  trendingError: "",
  recommendingError: "",
};
export interface ApiHomePayload {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}
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
        (state, action: PayloadAction<ApiHomePayload>) => {
          state.loading = false;
          state.trending = action.payload.results
            .map((element: MultiMedia) => {
              return { ...element, media_type: element.media_type };
            })
            .slice(0, 5);
          state.recommending = action.payload.results.slice(-15);
        }
      )
      .addCase(fetchMedia.rejected, (state) => {
        state.loading = false;
        state.trendingError = "Error Fetching Trending Movies";
        state.recommendingError = "Error Fetching Trending Movies";
      });
  },
});

export const fetchMedia = createAsyncThunk(
  "home/fetchMedia",
  async (): Promise<ApiHomePayload> => {
    const response = await axios.get(requests.fetchTrending, {
      params: {
        include_adult: "false",
      },
    });
    const data: Promise<ApiHomePayload> = await response.data;
    return data;
  }
);

export default homeSlice.reducer;
