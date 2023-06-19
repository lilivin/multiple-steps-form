import { render, fireEvent } from "@testing-library/react";
import PersonalInfo from "..";
import FormProvider from "../../../../../context/formContext";

describe("Personal Info component", () => {
  const renderInputComponent = () => {
    return render(
      <FormProvider>
        <PersonalInfo />
      </FormProvider>
    );
  };

  it("renders correctly", () => {
    const { getByTestId } = renderInputComponent();
    expect(getByTestId("select-plan-container")).toBeInTheDocument();
  });

//   it("should updates form value on input change", () => {
//     const { getByTestId } = renderInputComponent();
//     const inputElement = getByTestId("input");
//     fireEvent.change(inputElement, { target: { value: "John" } });
//     expect(inputElement).toHaveValue("John");
//   });

//   it("should triggers onBlur event and sets form error if input value is invalid", () => {
//     const { getByTestId } = renderInputComponent();
//     const inputElement = getByTestId("input");
//     fireEvent.change(inputElement, { target: { value: "123" } });
//     fireEvent.blur(inputElement);
//     expect(inputElement.classList).toContain("error"); // Assuming "error" is the CSS class for error styling
//     expect(getByTestId('input-error')).toBeInTheDocument(); // Check if the form show error message
//   });

//   it("should triggers onBlur event and does not set form error if input value is valid", () => {
//     const { getByTestId } = renderInputComponent();
//     const inputElement = getByTestId("input");
//     fireEvent.change(inputElement, { target: { value: "John" } });
//     fireEvent.blur(inputElement);
//     expect(inputElement.classList).not.toContain("error");
//     // expect(getByTestId('input-error')).not.toBeInTheDocument(); // Check if the form isn't show error message
//   });
});
