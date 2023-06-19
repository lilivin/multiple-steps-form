import { render, fireEvent } from "@testing-library/react";
import {
  FormContext,
  FormContextType,
  defaultFormError,
  defaultFormInfo,
} from "../../../../../../../context/formContext";
import NavigationItem from "..";

describe("Navigation Item Component", () => {
  const renderInputComponent = (
    pageNumber: number,
    content: string,
    providerProps: FormContextType
  ) => {
    return render(
      <FormContext.Provider value={providerProps}>
        <NavigationItem pageNumber={pageNumber}>{content}</NavigationItem>
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
    const pageNumber = 1;
    const content = "Personal Info";
    const { getByTestId } = renderInputComponent(
      pageNumber,
      content,
      providerProps
    );

    // Assert the component container is rendered
    expect(getByTestId("navigation-item")).toBeInTheDocument();
    // // Assert the step number is rendered
    expect(getByTestId("navigation-item-step-number")).toBeInTheDocument();
    // // Assert the step name is rendered
    expect(getByTestId("navigation-item-step-name")).toBeInTheDocument();
  });

  it("should render content correctly", () => {
    const pageNumber = 1;
    const content = "Personal Info";
    const { getByTestId } = renderInputComponent(
      pageNumber,
      content,
      providerProps
    );

    // Assert the page number has correct content
    expect(getByTestId("navigation-item-page-number")).toHaveTextContent(
      pageNumber.toString()
    );
    // Assert the step number has correct content
    expect(getByTestId("navigation-item-step-number")).toHaveTextContent(
      pageNumber.toString()
    );
    // Assert the step name has correct content
    expect(getByTestId("navigation-item-step-name")).toHaveTextContent(content);
  });

  it("should have the 'active' class when the current page matches the page number", () => {
    const pageNumber = 1;
    const content = "Personal Info";
    const { getByTestId } = renderInputComponent(
      pageNumber,
      content,
      providerProps
    );

    expect(getByTestId("navigation-item")).toHaveClass("active");
  });

  it("should call setCurrentPage when clicked and currentPage < 5", () => {
    const pageNumber = 1;
    const content = "Personal Info";
    const { getByTestId } = renderInputComponent(
      pageNumber,
      content,
      providerProps
    );

    const navigationItem = getByTestId("navigation-item");
    fireEvent.click(navigationItem);
    expect(providerProps.setCurrentPage).toHaveBeenCalledWith(pageNumber);
  });

  it("should not call setCurrentPage when currentPage is biger than 4", () => {
    const pageNumber = 5;
    const content = "Personal Info";
    providerProps.currentPage = 5;
    const { getByTestId } = renderInputComponent(
      pageNumber,
      content,
      providerProps
    );
    const navigationItem = getByTestId("navigation-item");
    fireEvent.click(navigationItem);
    expect(providerProps.setCurrentPage).not.toHaveBeenCalled();
  });

  it("should not call setCurrentPage when checkFormError returns true", () => {
    const pageNumber = 5;
    const content = "Personal Info";
    providerProps.checkFormError = jest.fn().mockReturnValue(true);
    const { getByTestId } = renderInputComponent(
      pageNumber,
      content,
      providerProps
    );
    const navigationItem = getByTestId("navigation-item");
    fireEvent.click(navigationItem);
    expect(providerProps.setCurrentPage).not.toHaveBeenCalled();
  });
});
