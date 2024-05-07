import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import { ApiMovie, User } from "../../types";
import axios from "../../api/axios";

const getLocalStorage = () => {
  let bookmarks = localStorage.getItem("bookmarks");
  return bookmarks !== null && JSON.parse(bookmarks);
};
const setLocalStorage = (items: ApiMovie[]) => {
  localStorage.setItem("bookmarks", JSON.stringify(items));
};
interface AuthState {
  user: User | null;
  requestToken: string;
  sessionId: string;
  bookmarks: ApiMovie[];
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
      })
      .addCase(
        createSessionID.fulfilled,
        (state, action: PayloadAction<SessionIdPayload>) => {
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
    const response = await axios.post(requests.createSessionId, {
      request_token: request_token,
    });
    const data = await response.data;
    return data;
  }
);
export const loginUser = createAsyncThunk("auth/loginUser", async () => {
  const response = await axios.get(requests.createRequestToken);
  const data = await response.data;
  if (data.success) {
    const validateToken = await axios.post(requests.validateRequestToken, {
      username: import.meta.env.VITE_USERNAME,
      password: import.meta.env.VITE_PASSWORD,
      request_token: data.request_token,
    });
    const validateTokenData = await validateToken.data;
    return validateTokenData;
  }
  return data;
});

export const { setAuth, logout, updateBookmark } = authSlice.actions;

export default authSlice.reducer;
