import { it, expect, describe } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Input from "../../../components/shared/Input";

describe("Input Component", () => {
  it("should render with correct props that passed to it", () => {
    render(<Input name="email" type="email" placeholder="Email.." />);

    const placeholder = screen.getByPlaceholderText("Email..");

    expect(placeholder).toBeInTheDocument();
  });
  it("shows error message when input is required and empty", () => {
    render(<Input name="name" type="text" placeholder="Name.." />);

    const placeholder = screen.getByPlaceholderText("Name..");
    fireEvent.invalid(placeholder);
    const errorMsg = screen.getByText("Can't be empty");

    expect(errorMsg).toBeInTheDocument();
  });
  it("shows error message when input not empty but wrong email", () => {
    render(<Input name="email" type="email" placeholder="Email.." />);

    const placeholder = screen.getByPlaceholderText("Email..");
    fireEvent.input(placeholder, { target: { value: "invalidemail" } });
    fireEvent.invalid(placeholder);
    const errorMsg = screen.getByText("Add Valid Email");

    expect(errorMsg).toBeInTheDocument();
  });

  it("clears error message when input is corrected", () => {
    render(<Input name="name" type="text" placeholder="Name.." />);

    const placeholder = screen.getByPlaceholderText("Name..");
    fireEvent.invalid(placeholder);
    fireEvent.input(placeholder, { target: { value: "Solovic" } });

    const errorMsg = screen.queryByText("Can't be empty");
    expect(errorMsg).toBeNull();
  });
  it("clears error message when input is corrected and it was invalid email", () => {
    render(<Input name="email" type="email" placeholder="Email.." />);

    const placeholder = screen.getByPlaceholderText("Email..");
    fireEvent.input(placeholder, { target: { value: "invalidemail" } });
    fireEvent.input(placeholder, { target: { value: "Solovic@alex.com" } });

    const errorMsg = screen.queryByText("Add Valid Email");
    expect(errorMsg).toBeNull();
  });
});
