import { render, screen } from "@testing-library/react";
import Expanded from "../../../components/Details/Expanded";
import userEvent from "@testing-library/user-event";

describe("Expanded Component", () => {
  it("renders correctly when text is shorter than or equal to 170 characters", () => {
    const shortText = "This is a short text.";
    render(<Expanded text={shortText} />);
    const text = screen.getByText(shortText);

    expect(text).toBeInTheDocument();
  });

  it("renders correctly when text is longer than 170 characters", () => {
    const longText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    render(<Expanded text={longText} />);
    const text = screen.getByText(`${longText.substring(0, 170)}...`);
    const button = screen.queryByRole("button");

    expect(text).toBeInTheDocument();
    expect(button).toHaveTextContent("Show More");
  });

  it('expands and collapses text correctly when "Show More" button is clicked', async () => {
    const longText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    render(<Expanded text={longText} />);
    const subText = screen.getByText(`${longText.substring(0, 170)}...`);
    expect(subText).toBeInTheDocument();

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const fullText = screen.getByText(`${longText}`);

    expect(fullText).toBeInTheDocument();
    expect(button).toHaveTextContent("Show Less");

    await user.click(button);

    expect(subText).toBeInTheDocument();
    expect(button).toHaveTextContent("Show More");
  });
});
