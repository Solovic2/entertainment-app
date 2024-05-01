import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/requests";
import axios from "axios";
import { ApiMovie } from "../../types";

interface BookmarkState {
  bookmarks: ApiMovie[];
}
const getLocalStorage = () => {
  let bookmarks = localStorage.getItem("bookmarks");
  return bookmarks !== null && JSON.parse(bookmarks);
};
const addToLocalStorage = (newItem: ApiMovie) => {
  let bookmarks = localStorage.getItem("bookmarks");
  if (bookmarks !== null) {
    const parsedBookmarks: ApiMovie[] = JSON.parse(bookmarks);
    const items = [...parsedBookmarks, newItem];
    console.log(items);

    localStorage.setItem("bookmarks", JSON.stringify(items));
  }
};
const setLocalStorage = (items: ApiMovie[]) => {
  localStorage.setItem("bookmarks", JSON.stringify(items));
};
const initialState: BookmarkState = {
  bookmarks: getLocalStorage() || [],
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
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
});

export const { updateBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
