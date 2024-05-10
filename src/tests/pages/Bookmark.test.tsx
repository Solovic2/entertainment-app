import { it, expect, describe } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import Bookmark from "../../pages/Bookmark";
import { initialStateWithSessionId, renderWithProviders } from "../state";
import { MediaCardProp } from "../../types";

vi.mock("react-redux", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-redux")>()),
  useDispatch: vi.fn(),
}));
const movie: MediaCardProp = {
  id: 1,
  adult: "PG",
  title: "TEST",
  image: "/assets/placeholder-image.png",
  media_type: "movie",
  cardLink: "/media/1",
  date: "2012",
};

describe("Bookmark Component", () => {
  it("renders SearchInput component", () => {
    renderWithProviders(<Bookmark />, {
      preloadedState: {
        auth: initialStateWithSessionId,
      },
    });

    const searchInput = screen.getByPlaceholderText(
      "Search for bookmarked shows"
    );

    expect(searchInput).toBeInTheDocument();
  });
  it('renders "No Bookmarks Yet." when no bookmarks exist', () => {
    renderWithProviders(<Bookmark />, {
      preloadedState: {
        auth: initialStateWithSessionId,
      },
    });

    const noBookmarks = screen.queryByText("No Bookmarks Yet.");

    expect(noBookmarks).toBeInTheDocument();
  });

  it("should render movie cards only", () => {
    renderWithProviders(<Bookmark />, {
      preloadedState: {
        auth: { ...initialStateWithSessionId, bookmarks: [movie] },
      },
    });

    const movies = screen.queryByText("Movie Bookmarks");
    const tv = screen.queryByText("TV Series Bookmarks");

    expect(movies).toBeInTheDocument();
    expect(tv).not.toBeInTheDocument();
  });
  it("should render movie cards and tv", () => {
    renderWithProviders(<Bookmark />, {
      preloadedState: {
        auth: {
          ...initialStateWithSessionId,
          bookmarks: [movie, { ...movie, media_type: "tv" }],
        },
      },
    });

    const movies = screen.queryByText("Movie Bookmarks");
    const tv = screen.queryByText("TV Series Bookmarks");

    expect(movies).toBeInTheDocument();
    expect(tv).toBeInTheDocument();
  });

  it("should render search results if there are search results", () => {
    renderWithProviders(<Bookmark />, {
      preloadedState: {
        auth: initialStateWithSessionId,
      },
    });

    const searchInput = screen.getByPlaceholderText(
      "Search for bookmarked shows"
    );
    fireEvent.input(searchInput, { target: { value: "here" } });
    const movies = screen.queryByText("Movie Bookmarks");
    const tv = screen.queryByText("TV Series Bookmarks");
    const searchCard = screen.queryByText("Found");

    expect(movies).not.toBeInTheDocument();
    expect(tv).not.toBeInTheDocument();
    expect(searchCard).not.toBeInTheDocument();
  });
});
