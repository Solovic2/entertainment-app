import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import { Media, MediaCardProp, User } from "../../types";
import axios from "../../api/axios";
import { basic_imageUrl } from "../../constants";

interface AuthState {
  user: User | null;
  requestToken: string;
  sessionId: string;
  bookmarks: MediaCardProp[];
  error: boolean;
  loading: boolean;
}
interface RequestTokenPayload {
  success: boolean;
  request_token: string;
  expires_at: string;
}
interface SessionIdPayload {
  success: boolean;
  session_id: string;
}
const getLocalStorage = () => {
  const bookmarks = localStorage.getItem("bookmarks");
  if (bookmarks !== null) {
    const items = JSON.parse(bookmarks);
    return items.map((item: Media) => {
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
          item.title || item.name || item.original_name || item.original_title,
        cardLink:
          item.media_type === "tv"
            ? `${`/tv/${item.id}`}`
            : `${`/${item.media_type}/${item.id}`}`,
      };
    }) as MediaCardProp[];
  }
  return bookmarks !== null && JSON.parse(bookmarks);
};
const setLocalStorage = (items: Media[]) => {
  localStorage.setItem("bookmarks", JSON.stringify(items));
};
export const initialStateAuthSlice: AuthState = {
  user: null,
  requestToken: "",
  sessionId: localStorage.getItem("sessionId") || "",
  bookmarks: getLocalStorage() || [],
  error: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuthSlice,
  reducers: {
    setAuth: (state, action) => {
      const { user, requestToken } = action.payload;
      state.user = user;
      state.requestToken = requestToken;
    },
    logout: (state) => {
      state.user = null;
      state.requestToken = "";
      state.sessionId = "";
      state.error = false;
      state.loading = false;
      localStorage.removeItem("sessionId");
    },
    updateBookmark: (state, action) => {
      let items;
      const movie = state.bookmarks.find(
        (element) => element.id === action.payload.id
      );

      if (movie) {
        items = state.bookmarks.filter(
          (element) => element.id !== action.payload.id
        );
        state.bookmarks = items;
      } else {
        items = [...state.bookmarks, action.payload];
        state.bookmarks = items;
      }
      setLocalStorage(items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<RequestTokenPayload>) => {
          state.requestToken = action.payload.request_token;
          state.loading = false;
        }
      )
      .addCase(loginUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
    builder
      .addCase(createSessionID.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        createSessionID.fulfilled,
        (state, action: PayloadAction<SessionIdPayload>) => {
          state.error = false;
          const session_id: string = action.payload.session_id;
          state.sessionId = session_id;
          localStorage.setItem("sessionId", session_id);
          state.loading = false;
        }
      )
      .addCase(createSessionID.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const createSessionID = createAsyncThunk(
  "auth/createSessionID",
  async (request_token: string) => {
    try {
      const response = await axios.post(requests.createSessionId, {
        request_token: request_token,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      throw new Error("Error");
    }
  }
);
export const loginUser = createAsyncThunk("auth/loginUser", async () => {
  try {
    const response = await axios.get(requests.createRequestToken);
    const data = await response.data;
    if (data.success) {
      try {
        const validateToken = await axios.post(requests.validateRequestToken, {
          username: import.meta.env.VITE_USERNAME,
          password: import.meta.env.VITE_PASSWORD,
          request_token: data.request_token,
        });
        const validateTokenData = await validateToken.data;
        return validateTokenData;
      } catch (error) {
        throw new Error("Error");
      }
    } else {
      throw new Error("Error");
    }
  } catch (error) {
    throw new Error("Error");
  }
});

export const { setAuth, logout, updateBookmark } = authSlice.actions;

export default authSlice.reducer;
