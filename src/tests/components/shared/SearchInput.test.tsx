import { it, expect, describe } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchInput from "../../../components/shared/SearchInput";

describe("SearchInput Component", () => {
  it("should render with correct props that passed to it", () => {
    render(<SearchInput placeholder="Search" />);

    const placeholder = screen.getByPlaceholderText("Search");

    expect(placeholder).toBeInTheDocument();
  });
  it("display value of input if value is passed as a prop", () => {
    render(<SearchInput placeholder="Search" value="search" />);

    const placeholder = screen.getByPlaceholderText(
      "Search"
    ) as HTMLInputElement;
    const value = placeholder.value;

    expect(placeholder).toBeInTheDocument();
    expect(value).toBe("search");
  });
  it("call when onChange input", () => {
    const handleChange = vitest.fn();
    render(<SearchInput placeholder="Search" handleChange={handleChange} />);

    const placeholder = screen.getByPlaceholderText("Search");
    fireEvent.change(placeholder, { target: { value: "Writing.." } });

    expect(handleChange).toBeCalledWith(expect.any(Object));
  });
  it("call when onKeyDown input", () => {
    const handleKeyDown = vitest.fn();
    render(<SearchInput placeholder="Search" handleKeyDown={handleKeyDown} />);

    const placeholder = screen.getByPlaceholderText("Search");
    fireEvent.keyDown(placeholder, { key: "Enter" });

    expect(handleKeyDown).toBeCalledWith(expect.any(Object));
  });
});
