import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import LayoutCard from "../../../components/shared/LayoutCard";

describe("LayoutCard Component", () => {
  it("should render title and its children that passed to it", () => {
    render(
      <LayoutCard title="Movie">
        <h1>AOT</h1>
      </LayoutCard>
    );

    const title = screen.getByText("Movie");
    const children = screen.getByRole("heading");

    expect(title).toBeInTheDocument();
    expect(children).toBeInTheDocument();
    expect(children).toHaveTextContent(/AOT/i);
  });
});
