import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import { setupStore, AppStore, RootState } from "../state/store";
import { initialStateAuthSlice } from "../state/auth/authSlice";
import { initialStateDetailsSlice } from "../state/features/detailsSlice";
import { initialStateHomeSlice } from "../state/features/homeSlice";
import { initialStateMovieSlice } from "../state/features/movieSlice";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const initialStateWithSessionId = {
  sessionId: "sesssion",
  bookmarks: [],
  error: false,
  loading: false,
  requestToken: "",
  user: null,
};
export const initialStateWithOutSessionId = {
  sessionId: "",
  bookmarks: [],
  error: false,
  loading: false,
  requestToken: "",
  user: null,
};
export const mockAuthState: RootState = {
  auth: initialStateAuthSlice,
  details: initialStateDetailsSlice,
  home: initialStateHomeSlice,
  movies: initialStateMovieSlice,
  tv: initialStateMovieSlice,
};
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
