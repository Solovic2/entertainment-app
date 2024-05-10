import { it, expect, describe } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchInput from "../../../components/shared/SearchInput";

describe("SearchInput Component", () => {
  it("should render with correct props that passed to it", () => {
    render(<SearchInput placeholder="Search" setSearchParams={() => {}} />);

    const placeholder = screen.getByPlaceholderText("Search");

    expect(placeholder).toBeInTheDocument();
  });
  it("display value of input if value is passed as a prop", () => {
    render(
      <SearchInput
        placeholder="Search"
        value="search"
        setSearchParams={() => {}}
      />
    );

    const placeholder = screen.getByPlaceholderText(
      "Search"
    ) as HTMLInputElement;
    const value = placeholder.value;

    expect(placeholder).toBeInTheDocument();
    expect(value).toBe("search");
  });
  it("calls setSearchParams when input value changes and Press Enter", () => {
    render(<SearchInput placeholder="Search" setSearchParams={() => {}} />);

    const placeholder = screen.getByPlaceholderText("Search");
    fireEvent.change(placeholder, { key: "Enter", target: { value: "Ok" } });

    expect(placeholder).toHaveValue("Ok");
  });
  it("call when setSearchParams change if Click Enter", () => {
    const setSearchParamsMock = vi.fn();
    render(
      <SearchInput placeholder="Search" setSearchParams={setSearchParamsMock} />
    );

    const placeholder = screen.getByPlaceholderText("Search");
    fireEvent.keyDown(placeholder, { key: "Enter" });

    expect(setSearchParamsMock).toBeCalledWith(expect.any(Object));
  });
});
