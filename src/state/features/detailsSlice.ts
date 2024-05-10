import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { ApiDetails, Media, MediaCardProp } from "../../types";
import { basic_imageUrl, initialMovieDetails } from "../../constants";

interface detailsType {
  type: string | undefined;
  id: string | undefined;
}
interface DetailState {
  loading: boolean;
  movieDetails: ApiDetails;
  similarMovie: MediaCardProp[];
  detailError: string;
}
export const initialStateDetailsSlice: DetailState = {
  loading: false,
  movieDetails: initialMovieDetails,
  similarMovie: [],
  detailError: "",
};

const detailsSlice = createSlice({
  name: "details",
  initialState: initialStateDetailsSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecificMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpecificMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetails = action.payload;
      })
      .addCase(fetchSpecificMedia.rejected, (state) => {
        state.loading = false;
        state.detailError = "Error Fetching details";
      });
    builder
      .addCase(fetchSimilarMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSimilarMedia.fulfilled, (state, action) => {
        state.loading = false;
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
        state.loading = false;
        state.detailError = "Error Fetching details";
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
