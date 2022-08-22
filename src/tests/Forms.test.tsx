import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "../components/App/App";

describe("Forms", () => {
  it("lets add somthing into forms, checks validity and adds card on the page", async () => {
    render(<App />);
    const linkToForms = screen.getByTestId("link-forms");
    await waitFor(() => {
      fireEvent.click(linkToForms);
      expect(
        screen.getByText(/Добавление книги в коллекцию/i)
      ).toBeInTheDocument();
    });

    const inputName = screen.getByTestId("form-book-name");
    user.type(
      inputName,
      "Особенности миграции одуванчиков в темное время суток"
    );

    const inputAuthor = screen.getByTestId("form-book-author");
    user.type(inputAuthor, "Р.А. Стасевич, Г.И. Филинов");

    const inputData = screen.getByTestId("form-book-data");
    user.type(inputData, "01.01.1980");

    const inputPublisher = screen.getByRole("combobox");
    user.selectOptions(
      inputPublisher,
      within(inputPublisher).getByRole("option", { name: "Азбука" })
    );

    const inputRead = screen.getByTestId("form-book-read");
    await waitFor(() => fireEvent.click(inputRead));
    expect(inputRead).toBeChecked();

    const buttonSubmit = screen.getByRole("button");
    await waitFor(() => fireEvent.click(buttonSubmit));
    setTimeout(async () => {
      const card = await waitFor(() => screen.findByText(/одуванчиков/i));
      expect(card).toBeInTheDocument();
    }, 1000);
  });
});
