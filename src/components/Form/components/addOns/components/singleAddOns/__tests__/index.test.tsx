import { render, fireEvent, waitFor } from "@testing-library/react";
import FormProvider, {
  AddOnsEnum,
  FormContext,
  FormContextType,
  defaultFormError,
  defaultFormInfo,
} from "../../../../../../../context/formContext";
import SingleAddOns from "..";
import { getAddOnById } from "../../../../../../../helpers/getAddOnsData";
import { act } from "react-dom/test-utils";

describe("Single Add On component", () => {
  const renderInputComponent = (
    id: AddOnsEnum,
    providerProps: FormContextType
  ) => {
    return render(
      <FormContext.Provider value={providerProps}>
        <SingleAddOns id={id} />
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

  it("renders correctly", () => {
    const addOn = getAddOnById(AddOnsEnum.CustomizableProfile);
    const { queryByText } = renderInputComponent(
      AddOnsEnum.CustomizableProfile,
      providerProps
    );

    //Check all values rendered correctly
    expect(queryByText(addOn.name)).toBeInTheDocument();
    expect(queryByText(addOn.subtitle)).toBeInTheDocument();
    expect(queryByText(`+$${addOn.price}/mo`)).toBeInTheDocument();
  });

  it("should apply active style for Add On Customizeable Profile on render", () => {
    const { container } = renderInputComponent(
      AddOnsEnum.CustomizableProfile,
      providerProps
    );
    expect(container.firstChild).toHaveClass("active");
  });

  it("should check active class and add it after click", () => {
    const { getByTestId } = renderInputComponent(
      AddOnsEnum.CustomizableProfile,
      providerProps
    );

    const singleAddOnContainer = getByTestId("single-add-on-container");

    // Check item haven't class before click
    expect(singleAddOnContainer).toHaveClass("active");
    // Simulate a click on the component
    fireEvent.click(singleAddOnContainer);

    expect(providerProps.updateForm).toHaveBeenCalledWith({
      name: "addOns",
      value: AddOnsEnum.CustomizableProfile,
    });
  });

  it("test", () => {
    const { getByTestId } = renderInputComponent(
      AddOnsEnum.OnlineService,
      providerProps
    );
    const checkbox = getByTestId("single-add-on-checkbox");

    fireEvent.click(checkbox);

    expect(providerProps.updateForm).toHaveBeenCalledWith({
      name: "addOns",
      value: AddOnsEnum.OnlineService,
    });
  });

  it("should not have active class when add-on is not included in formInfo", () => {
    providerProps.formInfo.addOns = [];
    const { getByTestId } = renderInputComponent(
      AddOnsEnum.OnlineService,
      providerProps
    );
    const singleAddOnContainer = getByTestId("single-add-on-container");

    expect(singleAddOnContainer).not.toHaveClass("active");
  });
});
