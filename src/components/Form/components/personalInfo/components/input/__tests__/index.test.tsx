import { render, fireEvent } from "@testing-library/react";
import Input from "..";
import FormProvider from "../../../../../../../context/formContext";

describe("Input component", () => {
  const renderInputComponent = () => {
    return render(
      <FormProvider>
        <Input
          label="Name"
          placeholder="Enter your name"
          type="text"
          name="name"
          pattern={/^[A-Za-z]+$/}
          errorMessage="Invalid name"
        />
      </FormProvider>
    );
  };

  it("renders correctly", () => {
    const { getByTestId } = renderInputComponent();
    expect(getByTestId("input-container")).toBeInTheDocument();
    expect(getByTestId("input-label")).toBeInTheDocument();
    expect(getByTestId("input")).toBeInTheDocument();
  });

  it("should update form value on input change", () => {
    const { getByTestId } = renderInputComponent();
    const inputElement = getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "John" } });
    expect(inputElement).toHaveValue("John");
  });

  it("should set form error if input value is invalid", () => {
    const { getByTestId } = renderInputComponent();
    const inputElement = getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "123" } });
    fireEvent.blur(inputElement);
    const inputErrorElement = getByTestId("input-error");
    expect(inputErrorElement).toBeInTheDocument();
    expect(inputErrorElement.textContent).toBe("Invalid name");
    expect(inputErrorElement.classList).toContain("active");
    expect(inputErrorElement.classList).not.toContain("disactive");
  });

  it("should does not set form error if input value is valid", () => {
    const { getByTestId, queryByTestId } = renderInputComponent();
    const inputElement = getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "John" } });
    fireEvent.blur(inputElement);
    expect(inputElement.classList).not.toContain("error");
    expect(queryByTestId('input-error')).not.toBeInTheDocument(); // Check if the form isn't show error message
  });
});
