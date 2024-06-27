import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "../../../components/shared/Button";
import userEvent from "@testing-library/user-event";

describe("Button Component", () => {
  it("should render the name provided to it", () => {
    render(<Button name="Login" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Login");
  });
  it("should be Clicked when user click on it", async () => {
    const clickFn = vitest.fn();
    render(<Button name="Login" onClick={clickFn} />);
    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);
    expect(clickFn).toHaveBeenCalledTimes(1);
  });
  it("should be  disabled when disabled prop is true", async () => {
    render(<Button name="Login" disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
  it("should be contain className when className prop is passed", async () => {
    render(<Button name="Login" className="mt-5" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("mt-5");
  });
});
