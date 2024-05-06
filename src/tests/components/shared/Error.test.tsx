import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Error from "../../../components/shared/Error";

describe("Error Component", () => {
  it("should render message that passed to it", () => {
    render(<Error message="An Error Occur" />);

    const error = screen.getByText("An Error Occur");

    expect(error).toBeInTheDocument();
  });
  it("when on click make error message hidden", async () => {
    render(<Error message="An Error Occur" />);

    const errorDiv = screen.getByRole("div-error");
    expect(errorDiv).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(errorDiv);

    expect(errorDiv).toHaveClass("hidden");
  });
});
