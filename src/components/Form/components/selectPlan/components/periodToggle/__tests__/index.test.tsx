import { render, fireEvent } from "@testing-library/react";
import FormProvider, {
  FormContext,
  FormContextType,
  PlanPeriodEnum,
  PlanTypeEnum,
  defaultFormError,
  defaultFormInfo,
} from "../../../../../../../context/formContext";
import PeriodToggle from "..";

describe("Period Toggle Component", () => {
  const renderInputComponent = (providerProps: FormContextType) => {
    return render(
      <FormContext.Provider value={providerProps}>
        <PeriodToggle />
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

  it("should render the component correctly with classes", () => {
    const { getByTestId } = renderInputComponent(providerProps);

    // Assert the component is rendered
    expect(getByTestId("period-toggle-container")).toBeInTheDocument();
    // // Assert the plan name is rendered
    expect(getByTestId("period-toggle-name-monthly")).toHaveTextContent("Monthly");
    expect(getByTestId("period-toggle-name-monthly")).toHaveClass("active");
    // // Assert the price is rendered
    expect(getByTestId("period-toggle-name-yearly")).toHaveTextContent("Yearly");
    expect(getByTestId("period-toggle-name-yearly")).not.toHaveClass("active");
  });

  it("should render Yearly as active label after click when planPeriod is monthly", () => {
    const { getByTestId } = renderInputComponent(providerProps);
    const periodToggleNameMonthly = getByTestId("period-toggle-name-monthly");
    const periodToggleNameYearly = getByTestId("period-toggle-name-yearly");
    // Check items classes before click
    expect(periodToggleNameMonthly).toHaveClass("active");
    expect(periodToggleNameYearly).not.toHaveClass("active");

    // Simulate a click on the component
    fireEvent.click(getByTestId("period-toggle-container"));

    // Check items classes after click
    expect(periodToggleNameMonthly).not.toHaveClass("active");
    expect(periodToggleNameYearly).toHaveClass("active");
  });

  it("should call update function when it's clicked", () => {
    providerProps.formInfo.planPeriod = PlanPeriodEnum.Monthly
    const { getByTestId } = renderInputComponent(providerProps);

    const periodToggleContainer = getByTestId("period-toggle-container");
    fireEvent.click(periodToggleContainer);
    // expect(providerProps.updateForm).toHaveBeenCalled();
    expect(providerProps.updateForm).toHaveBeenCalledWith({
      name: "planPeriod",
      value: PlanPeriodEnum.Yearly,
    });
  });
});
