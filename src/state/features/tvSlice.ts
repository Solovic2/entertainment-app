import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { ApiMovie, ApiPayload, MovieState } from "../../types";

const initialState: MovieState = {
  loading: false,
  movieList: [],
  searchResults: [],
  searchError: "",
  searchLoading: false,
  page: 1,
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
    builder
      .addCase(fetchSearchTV.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(
        fetchSearchTV.fulfilled,
        (state, action: PayloadAction<ApiPayload>) => {
          state.searchLoading = false;
          state.searchResults = action.payload.results.map((item: ApiMovie) => {
            return { ...item, movie_type: "tv" };
          });
        }
      )
      .addCase(fetchSearchTV.rejected, (state) => {
        state.searchLoading = false;
        state.searchError = "Error Fetching Search";
      });
  },
});

export const fetchTvMedia = createAsyncThunk(
  "tv/fetchTvMedia",
  async (page: number): Promise<any> => {
    const response = await axios.get(requests.fetchTV, {
      params: {
        include_adult: "true",
        language: "en-US",
        page: page,
      },
    });
    const data: Promise<any> = await response.data;
    return data;
  }
);
export const fetchSearchTV = createAsyncThunk(
  "tv/fetchSearchTV",
  async (search: string): Promise<any> => {
    const response = await axios.get(requests.fetchSearchTV, {
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

export default tvSlice.reducer;
