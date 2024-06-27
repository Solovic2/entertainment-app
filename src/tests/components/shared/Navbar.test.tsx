import { it, expect, describe } from "vitest";
import { screen } from "@testing-library/react";
import Navbar from "../../../components/shared/Navbar";
import { useNavigate } from "react-router-dom";

import userEvent from "@testing-library/user-event";
import { useDispatch } from "react-redux";

vi.mock("react-redux", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-redux")>()),
  useDispatch: vi.fn(),
}));

vi.mock("react-router-dom", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-router-dom")>()),
  useNavigate: vi.fn(),
}));

import {
  initialStateWithOutSessionId,
  initialStateWithSessionId,
  renderWithProviders,
} from "../../state";

describe("Navbar Component", () => {
  it("should render correct items", () => {
    renderWithProviders(<Navbar />);

    const item = screen.getAllByRole("listitem");

    item.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    expect(item).toHaveLength(3);
  });

  it("should render bookmark link beside all navbar items if user is logged in", async () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: initialStateWithSessionId,
      },
    });

    const item = screen.getAllByRole("listitem");

    item.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    expect(item).toHaveLength(4);
  });

  it("should display profile image button if user logged in", () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: initialStateWithSessionId,
      },
    });

    const img = screen.queryByAltText("user-image");

    expect(img).toBeInTheDocument();
  });

  it("should not display profile image button if user not logged in", () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: initialStateWithOutSessionId,
      },
    });

    const img = screen.queryByAltText("user-image");

    expect(img).not.toBeInTheDocument();
  });

  it("On Click on div image Should Display Login if no user", async () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: initialStateWithOutSessionId,
      },
    });

    const user = userEvent.setup();
    const divContainer = screen.getByRole("login-click");
    await user.click(divContainer);
    const login = screen.queryByText("Login");

    expect(login).toBeInTheDocument();
  });

  it("On Click on LogOut is to navigate to login page", async () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    const dispatchMock = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(dispatchMock);

    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: initialStateWithSessionId,
      },
    });

    const user = userEvent.setup();
    const divContainer = screen.getByRole("login-click");
    await user.click(divContainer);
    const logOut = screen.queryByText("Logout");
    const divLogOutContainer = screen.getByRole("logout-click");

    expect(logOut).toBeInTheDocument();

    await user.click(divLogOutContainer);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({ type: "auth/logout" });
  });
  it("On Click on div image Should Display Logout if there are user", async () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: initialStateWithSessionId,
      },
    });

    const user = userEvent.setup();
    const divContainer = screen.getByRole("login-click");
    await user.click(divContainer);
    const logOut = screen.queryByText("Logout");

    expect(logOut).toBeInTheDocument();
  });
});
