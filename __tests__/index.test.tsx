import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home", () => {
  it("renders a custom card", () => {
    render(<Home />);

    const heading = screen.getByText(/Card Title Here/i);

    expect(heading).toBeInTheDocument();
  });
});
