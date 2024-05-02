import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import movieSlice from "./features/movieSlice";
import homeSlice from "./features/homeSlice";
import tvSlice from "./features/tvSlice";
import bookmarkSlice from "./auth/bookmarkSlice";
import detailsSlice from "./features/detailsSlice";
import { homeApiSlice } from "./features/homeApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { movieApiSlice } from "./features/movieApiSlice";
import { tvApiSlice } from "./features/tvApiSlice";
import { detailsApiSlice } from "./features/detailsApiSlice";
// import counterReducer from "./counter/counterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookmark: bookmarkSlice,
    details: detailsSlice,
    movies: movieSlice,
    home: homeSlice,
    tv: tvSlice,
    [homeApiSlice.reducerPath]: homeApiSlice.reducer,
    [movieApiSlice.reducerPath]: movieApiSlice.reducer,
    [tvApiSlice.reducerPath]: tvApiSlice.reducer,
    [detailsApiSlice.reducerPath]: detailsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      homeApiSlice.middleware,
      movieApiSlice.middleware,
      tvApiSlice.middleware,
      detailsApiSlice.middleware
    ),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
