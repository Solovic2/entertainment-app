import { it, expect, describe } from "vitest";
import { screen } from "@testing-library/react";
import { MediaCardProp } from "../../../types";
import { renderWithProviders } from "../../state";
import Trending from "../../../components/home/Trending";
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

describe("Trending Component", () => {
  it("should render movies correctly if there are movies", async () => {
    renderWithProviders(<Trending movieList={movieList} />);

    movieList.forEach((movie) => {
      const texts = screen.getByText(`${movie.title}`);
      expect(texts).toBeInTheDocument();
    });
  });
});
