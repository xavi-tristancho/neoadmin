import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AuthProvider } from "@neoco/neoco-backoffice";
import { ConfigProvider, ThemeModeProvider } from "../../contexts";
import Sidebar from "./Sidebar";

describe("Regarding Sidebar component", () => {
  it("should render correctly", () => {
    render(
      <AuthProvider>
        <ConfigProvider>
          <ThemeModeProvider>
            <Sidebar>Test Content</Sidebar>
          </ThemeModeProvider>
        </ConfigProvider>
      </AuthProvider>
    );
    const element = screen.getByTestId("sidebar");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Test Content");
  });

  describe("when hamburger menu is clicked", () => {
    it("should open and close drawer", () => {
      render(
        <AuthProvider>
          <ConfigProvider>
            <ThemeModeProvider>
              <Sidebar>Test Content</Sidebar>
            </ThemeModeProvider>
          </ConfigProvider>
        </AuthProvider>
      );

      const hamburgerMenu = screen.getByLabelText("open drawer");
      const drawer = screen.getByTestId("sidebar-drawer");

      expect(hamburgerMenu).toBeInTheDocument();
      expect(drawer).toHaveStyle("width: 240px");
      fireEvent.click(hamburgerMenu);
      expect(drawer).toHaveStyle(`width: calc(56px + 1px)`);
      fireEvent.click(hamburgerMenu);
      expect(drawer).toHaveStyle("width: 240px");
    });
  });

  describe("when AppBarTitle is passed", () => {
    it("should render correctly", () => {
      render(
        <AuthProvider>
          <ConfigProvider>
            <ThemeModeProvider>
              <Sidebar appBarTitle="Test Title">Test Content</Sidebar>
            </ThemeModeProvider>
          </ConfigProvider>
        </AuthProvider>
      );

      const title = screen.getByText("Test Title");
      expect(title).toBeInTheDocument();
    });
  });
});
