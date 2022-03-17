import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "../App";

global.fetch = require("jest-fetch-mock");

const movies = [
  {
    description: "Romantic movie",
    id: 1,
    title: "Titanic",
  },
];

describe("App Component", () => {
  test("should display and hide loading", async () => {
    fetch.mockResponseOnce(JSON.stringify(movies));
    // when change the stage or stage will change like making api call, component should be wrapped inside act
    act(() => {
      render(<App />);
    });
    expect(screen.getByTestId("loading")).toBeTruthy();
    await waitFor(() => screen.getAllByTestId("list"));
    expect(screen.getByTestId("loading")).toBeFalsy();
  });

  test("should display movie list after api call", async () => {
    fetch.mockResponseOnce(JSON.stringify(movies), { status: 200 });
    // when change the stage or stage will change like making api call, component should be wrapped inside act
    act(() => {
      render(<App />);
    });
    await waitForElementToBeRemoved(() => screen.getByTestId("loading"));
    const list = screen.getByTestId("list");
    expect(list).toBeTruthy();
    expect(list.children.length).toBe(1);
  });

  test("should display movie detail when click on heading after", async () => {
    fetch.mockResponseOnce(JSON.stringify(movies), { status: 200 });
    act(() => {
      render(<App />);
    });
    await waitForElementToBeRemoved(() => screen.getByTestId("loading"));
    const headings = screen.getByTestId("heading");
    fireEvent.click(headings[0]);
    await waitFor(() => {
      expect(screen.getByText(movies[0].description)).toBeTruthy();
    });
  });
});
