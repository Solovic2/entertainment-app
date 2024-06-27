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
import Card from "../../../components/shared/Card";
import { MediaCardProp } from "../../../types";

const movie: MediaCardProp = {
  id: 1,
  adult: "PG",
  title: "TEST",
  image: "/assets/placeholder-image.png",
  media_type: "movie",
  cardLink: "/media/1",
  date: "2012",
};

const { title, date } = movie;

describe("Card Component", () => {
  it("should render correct items", () => {
    renderWithProviders(<Card movie={movie} key={1} />);

    const text = screen.getByText(`${title}`);
    const adultType = screen.getByText("PG");
    const dateText = screen.getByText(`${date}`);
    // const altImg = screen.getByAltText(`${title || name}`);

    expect(text).toBeInTheDocument();
    expect(adultType).toBeInTheDocument();
    expect(dateText).toBeInTheDocument();
    // expect(altImg).toBeInTheDocument();
  });

  it("if clicked the bookmark and user not loggedIn should make the action and display new bookMark icon", async () => {
    const dispatchMock = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(dispatchMock);

    renderWithProviders(<Card movie={movie} key={1} />, {
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

    renderWithProviders(<Card movie={movie} key={1} />, {
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
