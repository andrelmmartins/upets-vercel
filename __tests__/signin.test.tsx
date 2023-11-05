import { render, screen, fireEvent } from "@testing-library/react";
import SignIn from "../app/signin/page";

const setupEmaiInput = () => {
  const utils = render(<SignIn providers={{}} />);
  const input = screen.getByRole("textbox", {
    name: /e-mail/i,
  });

  return {
    input,
    ...utils,
  };
};

describe("SignIn Email Input", () => {
  it("renders input", () => {
    const { input } = setupEmaiInput();

    expect(input).toBeInTheDocument();
  });

  it("changes email value", () => {
    const { input } = setupEmaiInput();

    fireEvent.change(input, { target: { value: "john_Doe@mail.com" } });

    expect(input).toHaveValue("john_Doe@mail.com");
  });
});
