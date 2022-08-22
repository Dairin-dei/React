import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App/App";

describe("Search", () => {
  it("lets you text in input", async () => {
    render(<App />);
    const inputElement = screen.getByTestId("search-input");
    fireEvent.change(inputElement, {
      target: { value: "abc" },
    });
    expect(inputElement).toHaveValue("abc");
  });
});
