import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App/App";

const fakeLocalStorage = (function () {
  interface ObjectInterface {
    [key: string]: string;
  }

  const store: ObjectInterface = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
      return store[key];
    },
  };
})();

describe("App", () => {
  it("goes to the page About us", () => {
    render(<App />);
    const linkToAboutUs = screen.getByTestId("link-about");
    fireEvent.click(linkToAboutUs);
    expect(screen.getByText(/здесь что-то/i)).toBeInTheDocument();
  });

  it("goes to the page with forms", () => {
    render(<App />);
    const linkToForms = screen.getByTestId("link-forms");
    fireEvent.click(linkToForms);
    expect(
      screen.getByText(/Добавление книги в коллекцию/i)
    ).toBeInTheDocument();
  });

  it("saves smth to the storage", () => {
    const setItem = jest.spyOn(fakeLocalStorage, "setItem");
    const isSetItem = fakeLocalStorage.setItem("the-key", "Alice");

    expect(setItem).toHaveBeenCalled();
    expect(isSetItem).toBe("Alice");

    setItem.mockRestore();
  });

  it("gets value from the storage", () => {
    const getItem = jest.spyOn(fakeLocalStorage, "getItem");
    const isGetItem = fakeLocalStorage.getItem("the-key");

    expect(getItem).toHaveBeenCalled();
    expect(isGetItem).toBe("Alice");

    getItem.mockRestore();
  });
});
