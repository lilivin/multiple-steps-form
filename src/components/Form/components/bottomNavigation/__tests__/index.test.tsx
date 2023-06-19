import { render, fireEvent } from "@testing-library/react";
import BottomNavigation from "..";
import { FormContext, FormContextType, defaultFormError, defaultFormInfo } from "../../../../../context/formContext";

describe("Navigation Item Component", () => {
  const renderInputComponent = (providerProps: FormContextType) => {
    return render(
      <FormContext.Provider value={providerProps}>
        <BottomNavigation />
      </FormContext.Provider>
    );
  };

  let providerProps: FormContextType;
  beforeEach(
    () =>
      (providerProps = {
        currentPage: 1,
        setCurrentPage: jest.fn(),
        formInfo: defaultFormInfo,
        updateForm: jest.fn(),
        formError: defaultFormError,
        setFormError: jest.fn(),
        checkFormError: jest.fn(),
      })
  );

  it("should render the component correctly", () => {
    providerProps.currentPage = 2;
    const { getByTestId } = renderInputComponent(providerProps);

    // Assert the component container is rendered
    expect(getByTestId("bottom-navigation-container")).toBeInTheDocument();
    // // Assert the Go Back Button is rendered
    expect(getByTestId("bottom-navigation-back-button")).toHaveTextContent("Go Back");
    // // Assert the Next Step Button is rendered
    expect(getByTestId("bottom-navigation-next-button")).toHaveTextContent("Next Step");
  });

  it("should hide Go Back Button when it's first page", () => {
    const { queryByTestId, getByTestId } = renderInputComponent(providerProps);

    // // Assert the Go Back Button is rendered
    expect(queryByTestId("bottom-navigation-back-button")).not.toBeInTheDocument();
    // // Assert the Next Step Button is rendered
    expect(getByTestId("bottom-navigation-next-button")).toBeInTheDocument();
  });

  it("should change button text when it's last page", () => {
    providerProps.currentPage = 4;
    const { getByTestId } = renderInputComponent(providerProps);

    // // Assert the Go Back Button is rendered
    expect(getByTestId("bottom-navigation-back-button")).toBeInTheDocument();
    // // Assert the Next Step Button is rendered
    expect(getByTestId("bottom-navigation-next-button")).toHaveTextContent('Confirm');
  });

  it("should Back Button be clicked", () => {
    providerProps.currentPage = 3;
    const { getByTestId } = renderInputComponent(providerProps);

    const backButton = getByTestId("bottom-navigation-back-button");
    fireEvent.click(backButton);
    expect(providerProps.setCurrentPage).toHaveBeenCalled();
  });

  it("should Next Button be clicked", () => {
    providerProps.currentPage = 3;
    const { getByTestId } = renderInputComponent(providerProps);

    const nextButton = getByTestId("bottom-navigation-next-button");
    fireEvent.click(nextButton);
    expect(providerProps.setCurrentPage).toHaveBeenCalled();
  });

  it("should not call setCurrentPage when currentPage is biger than 5", () => {
    providerProps.currentPage = 6;
    const { getByTestId } = renderInputComponent(
      providerProps
    );
    const nextButton = getByTestId("bottom-navigation-next-button");
    fireEvent.click(nextButton);
    expect(providerProps.setCurrentPage).not.toHaveBeenCalled();
  });

  it("should not call setCurrentPage when currentPage is less than 1", () => {
    providerProps.currentPage = 0;
    const { getByTestId } = renderInputComponent(
      providerProps
    );
    const backButton = getByTestId("bottom-navigation-back-button");
    fireEvent.click(backButton);
    expect(providerProps.setCurrentPage).not.toHaveBeenCalled();
  });

  it("should not call setCurrentPage when checkFormError returns true", () => {
    providerProps.checkFormError = jest.fn().mockReturnValue(true);
    const { getByTestId } = renderInputComponent(
      providerProps
    );
    const nextButton = getByTestId("bottom-navigation-next-button");
    fireEvent.click(nextButton);
    expect(providerProps.setCurrentPage).not.toHaveBeenCalled();
  });

});
