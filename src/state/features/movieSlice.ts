import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { ApiPayload, Media, MediaCardProp } from "../../types";
import { basic_imageUrl } from "../../constants";

export interface MovieState {
  loading: boolean;
  movieList: MediaCardProp[];
  error: string | null;
  currentPage: number;
  totalPages: number;
}

export const initialStateMovieSlice: MovieState = {
  loading: false,
  movieList: [],
  error: null,
  totalPages: 1,
  currentPage: 1,
};

const movieSlice = createSlice({
  name: "movie",
  initialState: initialStateMovieSlice,
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
          // Add Media Type to each one
          const payload = action.payload.results.map((item: Media) => {
            return {
              ...item,
              media_type: "movie",
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
              cardLink: `${`/movie/${item.id}`}`,
            };
          });
          state.movieList = payload as MediaCardProp[];
          state.currentPage = action.payload.page;
          state.totalPages = action.payload.total_pages;
        }
      )
      .addCase(fetchMovieMedia.rejected, (state) => {
        state.loading = false;
        state.error = "Error Fetching Media";
      });
  },
});

export const fetchMovieMedia = createAsyncThunk(
  "movie/fetchMovieMedia",
  async (page: number) => {
    try {
      const response = await axios.get(requests.fetchMovies, {
        params: {
          include_adult: "false",
          language: "en-US",
          page: page,
        },
      });

      const data = await response.data;

      return data;
    } catch (error) {
      throw new Error("Error");
    }
  }
);

export default movieSlice.reducer;
