import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import MovieForm from "../components/movie-form";

global.fetch = require("jest-fetch-mock");

const empty_movie = {
  title: "",
  desciption: "",
};

const movie = {
  id: 3,
  title: "this is title",
  description: "this is description",
};

describe("Movie Form Component", () => {
  test("should have form elements", () => {
    const { getByLabelText, getByRole } = render(
      <MovieForm movie={empty_movie} />
    );
    expect(getByLabelText(/title/i)).toBeTruthy();
    expect(getByLabelText(/description/i)).toBeTruthy();
    expect(getByRole("button", { name: /create/i })).toBeTruthy();
  });

  test("should display form elements with form data", () => {
    const { getByLabelText, getByRole } = render(<MovieForm movie={movie} />);
    expect(getByLabelText(/title/i).value).toBe(movie.title);
    expect(getByLabelText(/description/i).value).toBe(movie.description);
    expect(getByRole("button", { name: /update/i })).toBeTruthy();
  });

  test("should trigger api request when clicked on button", async () => {
    const updatedMovie = jest.fn();
    fetch.mockImplementationOnce(movie);
    const { getByRole } = render(
      <MovieForm movie={movie} updatedMovie={updatedMovie} />
    );
    const submitButton = getByRole("button", { name: /update/i });
    fireEvent.click(submitButton);
    await wait(() => {
      expect(updatedMovie).toBeCalledTimes(1);
    });
  });

  test("should trigger api request when new movie button is clicked", async () => {
    const movieCreated = jest.fn();
    fetch.mockResponseOnce(JSON.stringify(movie));
    const { getByRole, getByLabelText } = render(
      <MovieForm movie={empty_movie} movieCreated={movieCreated} />
    );
    const submitButton = getByRole("button", { name: /create/i });
    const titleInput = getByLabelText(/title/i);
    const descriptionInput = getByLabelText(/description/i);
    fireEvent.change(titleInput, { title: "title 1" });
    fireEvent.change(descriptionInput, { title: "description" });
    fireEvent.click(submitButton);
    await wait(() => {
      expect(movieCreated.mock.calls[0][0]).toStrictEqual(movie);
    });
  });
});
