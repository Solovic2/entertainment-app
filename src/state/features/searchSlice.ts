import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { ApiPayload, Media, MediaCardProp, fetchParams } from "../../types";
import { basic_imageUrl } from "../../constants";

interface SearchState {
  loading: boolean;
  searchResults: MediaCardProp[];
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

const movieSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        fetchSearch.fulfilled,
        (state, action: PayloadAction<ApiPayload>) => {
          state.loading = false;
          state.error = "";
          state.searchResults = action.payload.results.map((item: Media) => {
            return {
              ...item,
              adult: item.adult ? "+18" : "PG",
              date:
                item.first_air_date?.substring(0, 4) ||
                item.release_date?.substring(0, 4),
              image: item.backdrop_path
                ? basic_imageUrl + item.backdrop_path
                : item.poster_path
                ? basic_imageUrl + item.poster_path
                : "/assets/placeholder-image.png",
              title:
                item.title ||
                item.name ||
                item.original_name ||
                item.original_title,
              cardLink:
                item.media_type === "tv"
                  ? `${`/tv/${item.id}`}`
                  : `${`/${item.media_type}/${item.id}`}`,
            };
          }) as MediaCardProp[];
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
  async ({ searchQuery, page, type }: fetchParams) => {
    try {
      const response = await axios.get(`/search/${type}`, {
        params: {
          query: searchQuery,
          include_adult: "false",
          language: "en-US",
          page: page,
        },
      });
      const data = await response.data;
      const payload = data.results
        .map((item: Media) => {
          if (type !== "multi") return { ...item, media_type: type };
          else return item;
        })
        .filter((element: Media) => element.media_type !== "person");

      return { ...data, results: payload };
    } catch (error) {
      throw new Error("Error");
    }
  }
);

export default movieSlice.reducer;
