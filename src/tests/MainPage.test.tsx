import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../components/App/App";
import fetch from "jest-fetch-mock";

export function APIRequest(seekTitle: string) {
  return fetch(`http://openlibrary.org/search.json?title=${seekTitle}`).then(
    (res) => res.json()
  );
}

describe("Main page", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("shows Main page at the opening", () => {
    render(<App />);
    const linkElement = screen.queryByText(/Главная страница/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("mocks fetch from API", async () => {
    render(<App />);
    const inputElement = screen.getByTestId("search-input");
    await waitFor(() =>
      fireEvent.change(inputElement, {
        target: { value: "shards of honor" },
      })
    );
    const button = screen.getByText(/найти книгу/i);
    expect(button).toBeInTheDocument();

    await waitFor(() => fireEvent.click(button));

    fetch.mockResponseOnce(JSON.stringify({ book: "Shards of honor, 2021" }));
    const res = await APIRequest("shards of honor");
    expect(res.book).toEqual("Shards of honor, 2021");
  });
});
