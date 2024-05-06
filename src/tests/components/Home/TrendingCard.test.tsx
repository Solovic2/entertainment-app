import { it, expect, describe } from "vitest";
import { screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { useDispatch } from "react-redux";

vi.mock("react-redux", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-redux")>()),
  useDispatch: vi.fn(),
}));

vi.mock("react-router-dom", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-router-dom")>()),
  useNavigate: vi.fn(),
}));

import {
  initialStateWithOutSessionId,
  initialStateWithSessionId,
  renderWithProviders,
} from "../../state";

import { ApiMovie } from "../../../types";
import TrendingCard from "../../../components/home/TrendingCard";

const movie: ApiMovie = {
  id: 1,
  overview: "Overview",
  popularity: 10,
  video: false,
  name: "Test Movie",
  title: "TEST",
  backdrop_path: "/assets/placeholder-image.png",
  poster_path: "",
  movie_type: "movie",
  media_type: "",
  first_air_date: "",
  release_date: "2022-01-01",
  adult: false,
};
const { name, title, first_air_date, release_date } = movie;

// Card Date
const date = first_air_date?.substring(0, 4) || release_date?.substring(0, 4);

describe("TrendingCard Component", () => {
  it("should render correct items", () => {
    renderWithProviders(<TrendingCard movie={movie} key={1} />);

    const text = screen.getByText(`${title || name}`);
    const typeMedia = screen.getByText(`movie`);
    const adultType = screen.getByText("PG");
    const dateText = screen.getByText(`${date}`);

    expect(text).toBeInTheDocument();
    expect(typeMedia).toBeInTheDocument();
    expect(adultType).toBeInTheDocument();
    expect(dateText).toBeInTheDocument();
  });

  it("if clicked the bookmark and user not loggedIn should make the action and display new bookMark icon", async () => {
    const dispatchMock = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(dispatchMock);

    renderWithProviders(<TrendingCard movie={movie} />, {
      preloadedState: {
        auth: { ...initialStateWithSessionId, bookmarks: [movie] },
      },
    });

    const user = userEvent.setup();
    const bookMark = screen.getByRole("card-bookmark");
    const bookMarkLoggedIn = screen.queryByRole("bookmark-loggedIn");
    const bookMarkNotLoggedIn = screen.queryByRole("bookmark-notLoggedIn");

    await user.click(bookMark);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "auth/updateBookmark",
      payload: movie,
    });
    expect(bookMarkLoggedIn).toBeInTheDocument();
    expect(bookMarkNotLoggedIn).not.toBeInTheDocument();
  });
  it("if clicked the bookmark and user not loggedIn should display toaster", async () => {
    const dispatchMock = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(dispatchMock);

    renderWithProviders(<TrendingCard movie={movie} key={1} />, {
      preloadedState: {
        auth: { ...initialStateWithOutSessionId, bookmarks: [movie] },
      },
    });

    const user = userEvent.setup();
    const bookMark = screen.getByRole("card-bookmark");
    const bookMarkLoggedIn = screen.queryByRole("bookmark-loggedIn");
    const bookMarkNotLoggedIn = screen.queryByRole("bookmark-notLoggedIn");

    await user.click(bookMark);

    expect(dispatchMock).not.toHaveBeenCalledTimes(1);
    // Display Toaster
    expect(bookMarkLoggedIn).not.toBeInTheDocument();
    expect(bookMarkNotLoggedIn).toBeInTheDocument();
  });
});
