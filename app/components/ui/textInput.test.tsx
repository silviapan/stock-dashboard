import { render, screen, fireEvent } from "@testing-library/react";
import { TextInput } from "./textInput";

describe("TextInput", () => {
  it("should render the text input field with the given value", () => {
    const mockOnInputChange = jest.fn();

    render(
      <TextInput
        value="Test value"
        label="Enter input"
        helperText="Some helper text here"
        onInputChange={mockOnInputChange}
      />
    );
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputElement.value).toBe("Test value");
    expect(inputElement).not.toHaveAttribute("required"); // Not required by default
  });

  it("should render the required attribute when the required prop is true", () => {
    const mockOnInputChange = jest.fn();

    render(
      <TextInput
        value="Test value"
        label="Enter input"
        helperText="Some helper text here"
        required={true}
        onInputChange={mockOnInputChange}
      />
    );

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputElement).toHaveAttribute("required");
  });

  it("should trigger onInputChange when typing in the input field", () => {
    const mockOnInputChange = jest.fn();

    render(
      <TextInput
        value=""
        label="Enter input"
        helperText="Some helper text here"
        onInputChange={mockOnInputChange}
      />
    );

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;

    // Simulate user typing 'New Value'
    fireEvent.change(inputElement, { target: { value: "New Value" } });

    // Expect the onInputChange to be called with 'New Value'
    expect(mockOnInputChange).toHaveBeenCalledWith("New Value");
  });

  it("should trigger onInputChange when erasing all text in the input field", () => {
    const mockOnInputChange = jest.fn();

    render(
      <TextInput
        value="Text value"
        label="Enter input"
        helperText="Some helper text here"
        onInputChange={mockOnInputChange}
      />
    );

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;

    // Simulate user typing removing all text
    fireEvent.change(inputElement, { target: { value: "" } });

    // Expect the onInputChange to be called with an empty string
    expect(mockOnInputChange).toHaveBeenCalledWith("");
  });
});
