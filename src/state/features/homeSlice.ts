import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { ApiPayload, Media, MediaCardProp } from "../../types";
import { basic_imageUrl } from "../../constants";

export interface HomeState {
  loading: boolean;
  trending: MediaCardProp[];
  recommending: MediaCardProp[];
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
          state.trending = action.payload.results
            .map((item: Media) => {
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
            })
            .slice(0, 5) as MediaCardProp[];
          state.recommending = action.payload.results
            .map((item: Media) => {
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
            })
            .slice(-15) as MediaCardProp[];
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
  async (): Promise<ApiPayload> => {
    const response = await axios.get(requests.fetchTrending, {
      params: {
        include_adult: "false",
      },
    });
    const data: Promise<ApiPayload> = await response.data;
    return data;
  }
);

export default homeSlice.reducer;
