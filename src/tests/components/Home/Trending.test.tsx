import { it, expect, describe } from "vitest";
import { screen } from "@testing-library/react";
import { ApiMovie } from "../../../types";
import { renderWithProviders } from "../../state";
import Trending from "../../../components/home/Trending";

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
describe("Trending Component", () => {
  it("should render movies correctly if there are movies", async () => {
    renderWithProviders(<Trending movieList={movieList} />);

    movieList.forEach((movie) => {
      const texts = screen.getByText(`${movie.title || movie.name}`);
      expect(texts).toBeInTheDocument();
    });
  });
});
