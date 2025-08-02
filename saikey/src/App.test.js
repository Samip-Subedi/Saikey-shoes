import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Create a mock Redux store
const mockStore = configureStore([]);

test("renders App component", () => {
  // Define initial mock state
  const store = mockStore({
    user: { isAuthenticated: false, user: null }, // Mock user state
    products: { products: [], error: null, loading: false }, // Mock product state
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  // Example test: Check if an element exists
  expect(screen.getByRole("heading", { name: /welcome/i })).toBeInTheDocument();
});
