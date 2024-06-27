import { it, expect, describe } from "vitest";
import { screen } from "@testing-library/react";

import {
  initialStateWithOutSessionId,
  initialStateWithSessionId,
  renderWithProviders,
} from "../../state";
import ProtectedRoute from "../../../components/ui/ProtectedRoute";

vi.mock("react-redux", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-redux")>()),
  useDispatch: vi.fn(),
}));
vi.mock("react-router-dom", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-router-dom")>()),
  Navigate: vi.fn(),
}));
describe("Protected Route Component", () => {
  it("should not children if it is loggedIn", () => {
    renderWithProviders(
      <ProtectedRoute>
        <p>Hello, World!</p>
      </ProtectedRoute>,
      {
        preloadedState: {
          auth: initialStateWithSessionId,
        },
      }
    );

    const children = screen.queryByText("Hello, World!");

    expect(children).toBeInTheDocument();
  });

  it("should not render children if it is not loggedIn", () => {
    renderWithProviders(
      <ProtectedRoute>
        <p>Hello There</p>
      </ProtectedRoute>,
      {
        preloadedState: {
          auth: initialStateWithOutSessionId,
        },
      }
    );

    const children = screen.queryByText("Hello There");

    expect(children).not.toBeInTheDocument();
  });
});
