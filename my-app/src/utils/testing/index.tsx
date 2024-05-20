import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

export function renderWithProviders(
  ui: React.ReactElement,
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }
  // Return an object with the store
  return { store, ...render(ui, { wrapper: Wrapper }) };
}
