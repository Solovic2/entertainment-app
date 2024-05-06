import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { ApiDetails, ApiMovie } from "../../types";
import { initialMovieDetails } from "../../constants";

interface detailsType {
  type: string;
  id: string;
}
interface DetailState {
  loading: boolean;
  movieDetails: ApiDetails;
  similarMovie: ApiMovie[];
  detailError: string;
}
export const initialStateDetailsSlice: DetailState = {
  loading: false,
  movieDetails: initialMovieDetails,
  similarMovie: [],
  detailError: "",
};

interface DetailsData {
  data: ApiDetails;
  similarData: ApiMovie[];
}
const detailsSlice = createSlice({
  name: "details",
  initialState: initialStateDetailsSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecificMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSpecificMedia.fulfilled,
        (state, action: PayloadAction<DetailsData>) => {
          state.loading = false;
          state.movieDetails = action.payload.data;
          state.similarMovie = action.payload.similarData;
        }
      )
      .addCase(fetchSpecificMedia.rejected, (state) => {
        state.loading = false;
        state.detailError = "Error Fetching details";
      });
  },
});

export const fetchSpecificMedia = createAsyncThunk(
  "details/fetchSpecificMedia",
  async ({ type, id }: detailsType): Promise<any> => {
    const response = await axios.get(`/${type}/${id}`, {
      params: { language: "en-US" },
    });
    const similar = await axios.get(`/${type}/${id}/similar`, {
      params: { language: "en-US" },
    });

    const data: any = await Promise.all([response, similar]);
    const results = {
      data: data[0]?.data,
      similarData: data[1]?.data.results.map((element: ApiMovie) => {
        return { ...element, media_type: type };
      }),
    };
    return results;
  }
);

export default detailsSlice.reducer;
