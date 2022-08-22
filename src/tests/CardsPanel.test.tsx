import { render, screen, waitFor } from "@testing-library/react";
import App from "../components//App/App";

describe("Cards panel", () => {
  it("shows cards at the Main page", async () => {
    render(<App />);
    setTimeout(async () => {
      const cardsList = await waitFor(() => screen.findByTestId("cards-panel"));
      expect(cardsList).toBeInTheDocument();
    }, 1000);
  });
});
