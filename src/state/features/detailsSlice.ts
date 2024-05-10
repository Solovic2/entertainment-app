import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { ApiDetails, Media, MediaCardProp } from "../../types";
import { basic_imageUrl, initialMovieDetails } from "../../constants";

interface detailsType {
  type: string | undefined;
  id: string | undefined;
}
interface DetailState {
  loadingDetails: boolean;
  loadingSimilar: boolean;
  movieDetails: ApiDetails;
  similarMovie: MediaCardProp[];
  detailError: string;
  similarMovieError: string;
}
export const initialStateDetailsSlice: DetailState = {
  loadingDetails: false,
  loadingSimilar: false,
  movieDetails: initialMovieDetails,
  similarMovie: [],
  detailError: "",
  similarMovieError: "",
};

const detailsSlice = createSlice({
  name: "details",
  initialState: initialStateDetailsSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecificMedia.pending, (state) => {
        state.loadingDetails = true;
        state.detailError = "";
      })
      .addCase(fetchSpecificMedia.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.detailError = "";
        state.movieDetails = action.payload;
      })
      .addCase(fetchSpecificMedia.rejected, (state) => {
        state.loadingDetails = false;
        state.detailError = "Error Fetching details";
      });
    builder
      .addCase(fetchSimilarMedia.pending, (state) => {
        state.loadingSimilar = true;
        state.similarMovieError = "";
      })
      .addCase(fetchSimilarMedia.fulfilled, (state, action) => {
        state.loadingSimilar = false;
        state.similarMovieError = "";
        state.similarMovie = action.payload.results.map((item: Media) => {
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
      })
      .addCase(fetchSimilarMedia.rejected, (state) => {
        state.loadingSimilar = false;
        state.similarMovieError = "Error Fetching details";
        throw new Error("Error");
      });
  },
});

export const fetchSpecificMedia = createAsyncThunk(
  "details/fetchSpecificMedia",
  async ({ type, id }: detailsType) => {
    try {
      const response = await axios.get(`/${type}/${id}`, {
        params: { language: "en-US" },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      throw new Error("Error");
    }
  }
);
export const fetchSimilarMedia = createAsyncThunk(
  "details/fetchSimilarMedia",
  async ({ type, id }: detailsType) => {
    try {
      const response = await axios.get(`/${type}/${id}/similar`, {
        params: { language: "en-US" },
      });
      const data = await response.data;
      const payload = data.results.map((element: MediaCardProp) => {
        return { ...element, media_type: type };
      });
      return { ...data, results: payload };
    } catch (error) {
      throw new Error("Error");
    }
  }
);

export default detailsSlice.reducer;
