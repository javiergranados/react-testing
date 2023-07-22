import { render, screen } from "@testing-library/react";
import { Hello } from "./Hello";

it("Renders Hello World", () => {
  render(<Hello />);
  const myElement = screen.getByText(/Hello World/);
  expect(myElement).toBeInTheDocument();
});
