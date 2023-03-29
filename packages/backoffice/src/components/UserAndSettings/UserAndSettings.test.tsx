import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { AuthProvider } from "@neoco/neoco-backoffice";
import { ConfigProvider, ThemeModeProvider } from "../../contexts";
import UserAndSettings from "./UserAndSettings";

describe("Regarding UserAndSettings component", () => {
  it("should render the component without crashing", () => {
    render(getElement());
    expect(screen.getByTestId("user-and-settings")).toBeInTheDocument();
  });

  describe("regarding settings icon", () => {
    it("should render correctly", () => {
      const { getByLabelText } = render(getElement());
      const iconButton = getByLabelText("settings");
      expect(iconButton).toBeInTheDocument();
    });
    describe("when the user clicks in settings icon", () => {
      it("should open the menu", () => {
        const { getByLabelText, getByRole } = render(getElement());
        const iconButton = getByLabelText("settings");
        fireEvent.click(iconButton);
        const menu = getByRole("menu");
        expect(menu).toBeInTheDocument();
      });
      it("should display color mode button", () => {
        const { getByLabelText, getByText } = render(getElement());
        const iconButton = getByLabelText("settings");
        fireEvent.click(iconButton);
        const colorModeButton = getByText("dark");
        expect(colorModeButton).toBeInTheDocument();
      });
      it("should display language button", () => {
        const { getByLabelText, getByText } = render(getElement());
        const iconButton = getByLabelText("settings");
        fireEvent.click(iconButton);
        const languageButton = getByText("ES");
        expect(languageButton).toBeInTheDocument();
      });
      it("should display logout button", () => {
        const { getByLabelText, getByText } = render(getElement());
        const iconButton = getByLabelText("settings");
        fireEvent.click(iconButton);
        const logoutButton = getByText("log out");
        expect(logoutButton).toBeInTheDocument();
      });
    });

    describe("when the user clicks in color mode button", () => {
      it("should change the color mode", () => {
        const { getByLabelText, getByText } = render(getElement());
        const iconButton = getByLabelText("settings");
        fireEvent.click(iconButton);
        const colorModeButton = getByText("dark");
        fireEvent.click(colorModeButton);
        expect(colorModeButton).toHaveTextContent("light");
      });
    });
  });

  const getElement = () => (
    <AuthProvider>
      <ConfigProvider>
        <ThemeModeProvider>
          <UserAndSettings />
        </ThemeModeProvider>
      </ConfigProvider>
    </AuthProvider>
  );
});
