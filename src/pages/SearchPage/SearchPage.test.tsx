import userEvent from "@testing-library/user-event";
import { fireEvent, screen } from "@testing-library/react";
import titles from "../../utils/titles";
import { renderWithProviders } from "../../utils/testUtils";
import SearchPage from "./SearchPage";
import { mockTitleText } from "../../mocks/filmsMocks";

describe("Given a SearchPage page", () => {
  describe("When it is rendered", () => {
    test(`Then it should show a ${titles.nowPlaying} image`, async () => {
      const expectedAltText = titles.nowPlaying;

      renderWithProviders(<SearchPage />);
      const image = await screen.findByAltText(expectedAltText);

      expect(image).toBeInTheDocument();
    });

    test("Then the ScrollToTopButton should not be rendered", () => {
      renderWithProviders(<SearchPage />);

      const expectedAlText = titles.arrowUpAltText;

      const arrowUpImage = screen.queryByAltText(expectedAlText);

      expect(arrowUpImage).not.toBeInTheDocument();
    });
  });

  describe(`When it is rendered and the user types the text ${mockTitleText} in the search bar`, () => {
    test("Then it should show a film with the text inside its title", async () => {
      const inputText = mockTitleText;
      const expectedPlaceholder = titles.searchInputPlaceholder;
      const expectedTitle = /mario/i;

      renderWithProviders(<SearchPage />);
      const input = screen.getByPlaceholderText(expectedPlaceholder);
      await userEvent.type(input, inputText);
      const title = await screen.findAllByRole("heading");

      expect(title[title.length - 1]).toContain(expectedTitle);
    });
  });

  describe("When it is rendered and the user scrolls 400 to bottom", () => {
    test("Then it should show a ScrollToTopButton", async () => {
      renderWithProviders(<SearchPage />);

      fireEvent.scroll(window, { target: { scrollY: 500 } });

      const scrollToTopButton = await screen.findByRole("button", {
        name: titles.arrowUpAltText,
      });

      expect(scrollToTopButton).toBeInTheDocument();
    });
  });
});
