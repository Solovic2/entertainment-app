import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { Media, fetchParams } from "../../types";

interface SearchState {
  loading: boolean;
  searchResults: Media[];
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalSearchResults: number;
}
export const initialState: SearchState = {
  loading: false,
  searchResults: [],
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalSearchResults: 0,
};
export interface ApiSearchPayload {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}

const movieSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSearch.fulfilled,
        (state, action: PayloadAction<ApiSearchPayload>) => {
          state.loading = false;
          state.searchResults = action.payload.results;
          state.currentPage = action.payload.page;
          state.totalPages = action.payload.total_pages;
          state.totalSearchResults = action.payload.total_results;
        }
      )
      .addCase(fetchSearch.rejected, (state) => {
        state.loading = false;
        state.error = "Error Fetching Search";
      });
  },
});

export const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async ({
    searchQuery,
    page,
    type,
  }: fetchParams): Promise<ApiSearchPayload> => {
    const response = await axios.get(`/search/${type}`, {
      params: {
        query: searchQuery,
        include_adult: "false",
        language: "en-US",
        page: page,
      },
    });
    const data: Promise<ApiSearchPayload> = await response.data;
    const payload = (await data).results
      .map((item: Media) => {
        if (type !== "multi") return { ...item, media_type: type };
        else return item;
      })
      .filter((element) => element.media_type !== "person");

    console.log();

    return { ...data, results: payload };
  }
);

export default movieSlice.reducer;
