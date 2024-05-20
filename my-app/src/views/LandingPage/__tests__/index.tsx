import { fireEvent, getByRole, screen, waitFor } from "@testing-library/react";
import { LandingPage } from "..";
import { renderWithProviders } from "../../../utils/testing";

describe("<LandingPage />", () => {
  const mockNavigate = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: mockNavigate,
  }));

  it("should render properly", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, userName: "Test user" }]),
      })
    ) as jest.Mock;
    fetch(JSON.stringify({ rates: { CAD: 1.42 } }));
    renderWithProviders(<LandingPage />);

    expect(screen.getByText("Secret Santa")).toBeInTheDocument();
    expect(screen.getByText("LOADING...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Indentifícate")).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
    expect(screen.getByRole("option")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("option"));
    fireEvent.click(screen.getByRole("button", { name: "Go" }));
  });
});
