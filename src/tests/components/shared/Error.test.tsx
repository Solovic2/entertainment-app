import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Error from "../../../components/shared/Error";

describe("Error Component", () => {
  it("should render message that passed to it", () => {
    render(<Error message="An Error Occur" />);

    const error = screen.getByText("An Error Occur");

    expect(error).toBeInTheDocument();
  });
});
