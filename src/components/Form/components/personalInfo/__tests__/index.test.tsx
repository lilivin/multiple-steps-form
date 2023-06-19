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
    expect(getByTestId("personal-info")).toBeInTheDocument();
  });
  
});
