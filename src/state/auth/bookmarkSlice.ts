import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import { ApiMovie, ApiPayload } from "../../types";
import axios from "../../api/axios";

interface BookmarkState {
  bookmarksMovies: ApiMovie[];
  loadingMovies: boolean;
  errorMovies: boolean;
  bookmarksTV: ApiMovie[];
  loadingTV: boolean;
  errorTV: boolean;
}

const initialState: BookmarkState = {
  bookmarksMovies: [],
  loadingMovies: false,
  errorMovies: false,
  bookmarksTV: [],
  loadingTV: false,
  errorTV: false,
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.pending, () => {
        console.log("addFavorite.pending");
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        console.log("addFavorite.fulfilled");
      })
      .addCase(addFavorite.rejected, () => {
        console.log("addFavorite.rejected");
      });

    builder
      .addCase(fetchFavoriteMovies.pending, (state) => {
        console.log("fetchFavoriteMovies.pending");
        state.loadingMovies = true;
      })
      .addCase(
        fetchFavoriteMovies.fulfilled,
        (state, action: PayloadAction<ApiPayload>) => {
          state.bookmarksMovies = action.payload.results;
          state.loadingMovies = false;
        }
      )
      .addCase(fetchFavoriteMovies.rejected, (state) => {
        state.errorMovies = true;
        state.loadingMovies = false;
      });
    builder
      .addCase(fetchFavoriteTV.pending, (state) => {
        console.log("fetchFavoriteTV.pending");
        state.loadingTV = true;
      })
      .addCase(
        fetchFavoriteTV.fulfilled,
        (state, action: PayloadAction<ApiPayload>) => {
          state.bookmarksTV = action.payload.results;
          state.loadingTV = false;
        }
      )
      .addCase(fetchFavoriteTV.rejected, (state) => {
        state.errorTV = true;
        state.loadingTV = false;
      });
  },
});

export const fetchFavoriteMovies = createAsyncThunk(
  "bookmark/fetchFavoriteMovies",
  async (sessionId: string) => {
    const response = await axios.get(requests.fetchFavoriteMovies, {
      params: {
        language: "en-US",
        page: "1",
        sort_by: "created_at.asc",
        session_id: sessionId,
      },
    });
    const data = await response.data;
    return data;
  }
);
export const fetchFavoriteTV = createAsyncThunk(
  "bookmark/fetchFavoriteTV",
  async (sessionId: string) => {
    const response = await axios.get(requests.fetchFavoriteTV, {
      params: {
        language: "en-US",
        page: "1",
        sort_by: "created_at.asc",
        session_id: sessionId,
      },
    });
    const data = await response.data;
    return data;
  }
);
export const addFavorite = createAsyncThunk(
  "bookmark/addFavorite",
  async ({
    movie_type,
    id,
    sessionId,
  }: {
    movie_type: string | undefined;
    id: number;
    sessionId: string;
  }) => {
    const response = await axios.post(
      requests.addFavorite,
      {
        media_type: movie_type,
        media_id: id,
        favorite: true,
      },
      {
        params: {
          session_id: sessionId,
        },
      }
    );
    const data = await response.data;
    return { movie_type, data };
  }
);

export default bookmarkSlice.reducer;
