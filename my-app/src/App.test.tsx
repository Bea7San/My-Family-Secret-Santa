import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "./utils/testing";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRoutes: () => jest.fn(),
}));

test("renders learn react link", () => {
  renderWithProviders(<App />);
  const linkElement = screen.getByText(/Secret Santa/i);
  expect(linkElement).toBeInTheDocument();
});
