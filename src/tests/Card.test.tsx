import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../components//App/App";

describe("Card", () => {
  it("shows card at the Main page and a popup", () => {
    render(<App />);
    expect(screen.queryAllByAltText(/book/i)).toHaveLength(0);
    setTimeout(async () => {
      const cards = await waitFor(() => screen.findAllByAltText(/book/i));
      expect(cards).toHaveLength(12);
      const cardContent = await waitFor(() => screen.findAllByTestId("book"));
      expect(cardContent).toBeInTheDocument();
      const booksAlt = await waitFor(() =>
        screen.findAllByAltText("book image")
      );
      expect(booksAlt).toBeInTheDocument();

      const card = cards[0];
      fireEvent.click(card);
      expect(screen.getByText(/Информация о книге/i)).toBeInTheDocument();
    }, 1000);
  });
});
