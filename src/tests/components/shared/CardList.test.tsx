import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import CardList from "../../../components/shared/CardList";
import { ApiMovie } from "../../../types";
import { renderWithProviders } from "../../state";

const movieList: ApiMovie[] = [
  {
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
  },
  {
    id: 2,
    overview: "Overview2",
    popularity: 10,
    video: false,
    name: "Test Movie2",
    title: "TEST2",
    backdrop_path: "/assets/placeholder-image2.png",
    poster_path: "",
    movie_type: "movie2",
    media_type: "",
    first_air_date: "",
    release_date: "2022-01-01",
    adult: false,
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
      const texts = screen.getByAltText(`${movie.title || movie.name}`);
      expect(texts).toBeInTheDocument();
    });
  });
});
