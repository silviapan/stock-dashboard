import { render, screen, fireEvent } from "@testing-library/react";
import { within } from "@testing-library/dom";
import { Box, Button } from "@mui/material";
import { CardModal } from "./cardModal";
import { LabeledText } from "./text";

describe("CardModal", () => {
  it("should render and display the modal", () => {
    const mockhandleCloseModal = jest.fn();

    render(
      <CardModal
        displayModal={true}
        handleCloseModal={mockhandleCloseModal}
        cardTitle="Card Title"
      />
    );

    const modal = screen.getByRole("presentation");
    const titleElement = within(modal).getByText("Card Title");
    expect(titleElement).toBeInTheDocument();
    const saveButton = screen.queryByText("Save Changes");
    expect(saveButton).not.toBeInTheDocument();
  });

  it("should render child when passed", () => {
    const mockhandleCloseModal = jest.fn();

    render(
      <CardModal
        displayModal={true}
        handleCloseModal={mockhandleCloseModal}
        cardTitle="Card Title"
      >
        <div>Modal Content</div>
      </CardModal>
    );

    const modal = screen.getByRole("presentation");
    const divChild = within(modal).getByText("Modal Content");
    expect(divChild).toBeInTheDocument();
  });

  it("should render children when passed", () => {
    const mockhandleCloseModal = jest.fn();

    render(
      <CardModal
        displayModal={true}
        handleCloseModal={mockhandleCloseModal}
        cardTitle="Card Title"
      >
        <Box>
          <LabeledText label="Label here" text="Display text" />
          <Button>Click Button</Button>
        </Box>
      </CardModal>
    );

    const modal = screen.getByRole("presentation");
    const labeledTextChild = within(modal).getByText("Display text");
    expect(labeledTextChild).toBeInTheDocument();
    const buttonChild = within(modal).getByText("Click Button");
    expect(buttonChild).toBeInTheDocument();
  });

  it("should render the 'Save Changes' button when handleSave is passed", () => {
    const mockhandleCloseModal = jest.fn();
    const mockhandleSave = jest.fn();

    render(
      <CardModal
        displayModal={true}
        handleCloseModal={mockhandleCloseModal}
        cardTitle="Card Title"
        handleSave={mockhandleSave}
      >
        <Box>
          <LabeledText label="Label here" text="Display text" />
          <Button>Click Button</Button>
        </Box>
      </CardModal>
    );

    const modal = screen.getByRole("presentation");
    const saveButton = within(modal).getByText("Save Changes");
    expect(saveButton).toBeInTheDocument();
  });

  it("should call handleSave and close the modal when the 'Save Changes' button is clicked", () => {
    const handleCloseModal = jest.fn();
    const handleSave = jest.fn();

    const { rerender } = render(
      <CardModal
        displayModal={true}
        handleCloseModal={handleCloseModal}
        cardTitle="Test Modal"
        handleSave={handleSave}
      />
    );

    // Click the 'Save' button
    const saveButton = screen.getByText("Save Changes");
    fireEvent.click(saveButton);

    // Ensure handleSave is called when 'Cancel' is clicked
    expect(handleSave).toHaveBeenCalledTimes(1);

    // After handleSave is called, simulate rerender with displayModal as false
    rerender(
      <CardModal
        displayModal={false}
        handleCloseModal={handleCloseModal}
        cardTitle="Test Modal"
      />
    );

    // Check that the modal is no longer in the document
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });

  it("should call handleCloseModal and close the modal when the 'Cancel' button is clicked", () => {
    const handleCloseModal = jest.fn();

    const { rerender } = render(
      <CardModal
        displayModal={true}
        handleCloseModal={handleCloseModal}
        cardTitle="Test Modal"
      />
    );

    // Click the 'Cancel' button
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Ensure handleCloseModal is called when 'Cancel' is clicked
    expect(handleCloseModal).toHaveBeenCalledTimes(1);

    // After handleCloseModal is called, simulate rerender with displayModal as false
    rerender(
      <CardModal
        displayModal={false}
        handleCloseModal={handleCloseModal}
        cardTitle="Test Modal"
      />
    );

    // Check that the modal is no longer in the document
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });
});
