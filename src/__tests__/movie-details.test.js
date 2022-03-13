import React from "react";
import { render } from "@testing-library/react";
import MovieDetails from "../components/movie-details";

const selectedMovie = {
  avg_rating: 2.3333333333333335,
  description: "Romantic movie",
  id: 1,
  no_of_ratings: 3,
  title: "Titanic",
};

describe("Movie Detail Components", () => {
  test("Should match a snapshop", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />);
    expect(container).toMatchSnapshot();
  });
  test("should display title and description", () => {
    const { queryByText } = render(<MovieDetails movie={selectedMovie} />);
    expect(queryByText(selectedMovie.title)).toBeTruthy();
    expect(queryByText(selectedMovie.description)).toBeTruthy();
  });
  test("Should display no of ratings", () => {
    const { getByTestId } = render(<MovieDetails movie={selectedMovie} />);
    expect(getByTestId("no-ratings").innerHTML).toBe(
      `(${selectedMovie.no_of_ratings})`
    );
  });
});
