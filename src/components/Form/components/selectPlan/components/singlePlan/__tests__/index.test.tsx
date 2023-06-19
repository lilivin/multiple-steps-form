import { render, fireEvent } from "@testing-library/react";
import {
  FormContext,
  FormContextType,
  PlanPeriodEnum,
  PlanTypeEnum,
  defaultFormError,
  defaultFormInfo,
} from "../../../../../../../context/formContext";
import SinglePlan from "..";
import { getBillingPlanById } from "../../../../../../../helpers/getBillingPlans";

describe("Single Plan Component", () => {
  const renderInputComponent = (id: PlanTypeEnum, providerProps: FormContextType) => {
    return render(
      <FormContext.Provider value={providerProps}>
        <SinglePlan id={id} />
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
    const { getByTestId } = renderInputComponent(PlanTypeEnum.Pro, providerProps);

    // Assert the component is rendered
    expect(getByTestId("plan-container")).toBeInTheDocument();
    // // Assert the plan name is rendered
    expect(getByTestId("plan-name")).toBeInTheDocument();
    // // Assert the price is rendered
    expect(getByTestId("plan-price")).toBeInTheDocument();
  });

  it("should render correct content for spans", () => {
    const plan = getBillingPlanById(PlanTypeEnum.Pro);
    const { getByTestId } = renderInputComponent(PlanTypeEnum.Pro, providerProps);

    // // Assert the plan name is rendered
    expect(getByTestId("plan-name")).toHaveTextContent(plan.name);
    // // Assert the price is rendered
    expect(getByTestId("plan-price")).toHaveTextContent(`$${plan.monthly}/mo`);
  });

  it("should apply active style for Arcade plan on render", () => {
    const { getByTestId } = renderInputComponent(PlanTypeEnum.Arcade, providerProps);

    // Assert the active plan style is applied
    expect(getByTestId("plan-container")).toHaveClass("activePlan");
  });

  it("should render correct price when it's monthly period", () => {
    const plan = getBillingPlanById(PlanTypeEnum.Pro);
    providerProps.formInfo.planPeriod = PlanPeriodEnum.Monthly;
    const { getByTestId, queryByTestId } = renderInputComponent(PlanTypeEnum.Pro, providerProps);

    // Check item haven't class before click
    expect(getByTestId("plan-price")).toHaveTextContent(`$${plan.monthly}/mo`)
    expect(queryByTestId("plan-error")).toBeNull()
  });

  it("should call update form function after click single plan container", () => {
    const { getByTestId } = renderInputComponent(PlanTypeEnum.Pro, providerProps);

    const planContainer = getByTestId("plan-container");
    fireEvent.click(planContainer);
    // expect(providerProps.updateForm).toHaveBeenCalled();
    expect(providerProps.updateForm).toHaveBeenCalledWith({
      name: "planType",
      value: PlanTypeEnum.Pro,
    });
  });

  it("should display info about discount", () => {
    providerProps.formInfo.planPeriod = PlanPeriodEnum.Yearly;
    const { getByTestId } = renderInputComponent(PlanTypeEnum.Pro, providerProps);

    const planDiscount = getByTestId("plan-error");

    expect(planDiscount.classList).toContain("active");
    expect(planDiscount.textContent).toBe("2 Months Free");
  });
});
