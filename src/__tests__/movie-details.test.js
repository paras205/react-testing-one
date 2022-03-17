import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
  test("mouseover should highlight star", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />);
    const stars = container.querySelectorAll(".rate-container svg");
    stars.forEach((star, index) => {
      fireEvent.mouseOver(star);
      const highlighted_star = container.querySelectorAll(".purple");
      expect(highlighted_star.length).toBe(index + 1);
    });
  });
  test("mouseleave should highlight star", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />);
    const stars = container.querySelectorAll(".rate-container svg");
    stars.forEach((star) => {
      fireEvent.mouseOver(star);
      fireEvent.mouseOut(star);
      const highlighted_star = container.querySelectorAll(".purple");
      expect(highlighted_star.length).toBe(0);
    });
  });
  test("should make api call after star clicking", () => {
    const loadMovie = jest.fn();
    const { container } = render(
      <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
    );
  });
});
