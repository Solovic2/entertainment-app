import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import CardList from "../../../components/shared/CardList";
import { MediaCardProp } from "../../../types";
import { renderWithProviders } from "../../state";

const movieList: MediaCardProp[] = [
  {
    id: 1,
    adult: "PG",
    title: "TEST",
    image: "/assets/placeholder-image.png",
    media_type: "movie",
    cardLink: "",
    date: "",
  },
  {
    id: 2,
    adult: "PG",
    title: "TEST2",
    image: "/assets/placeholder-image.png",
    media_type: "tv",
    cardLink: "",
    date: "",
  },
];

describe("CardList Component", () => {
  it("should render No movies to show if no movies with title", () => {
    render(<CardList title="Movies" movieList={[]} />);

    const message = screen.queryByText("No movies to show ...");
    const title = screen.queryByText("Movies");

    expect(message).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  it("should render movies correctly if there are movies", async () => {
    renderWithProviders(<CardList title="Movies" movieList={movieList} />);

    const title = screen.getByText("Movies");
    expect(title).toBeInTheDocument();

    movieList.forEach((movie) => {
      const texts = screen.getByAltText(`${movie.title}`);
      expect(texts).toBeInTheDocument();
    });
  });
});
