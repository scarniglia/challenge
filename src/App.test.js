import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders copyright", () => {
  render(<App />);
  const linkElement = screen.getByText(/santi c./i);
  expect(linkElement).toBeInTheDocument();
});
