import * as React from "react";

export const enum PlanTypeEnum {
  Arcade = "arcade",
  Advanced = "advanced",
  Pro = "pro",
}

export const enum PlanPeriodEnum {
  Monthly = "monthly",
  Yearly = "yearly",
}

export const enum AddOnsEnum {
  OnlineService = "online-service",
  LargerStorage = "larger-storage",
  CustomizableProfile = "customizable-profile",
}

export interface IFormInfo {
  name: string;
  surname: string;
  email: string;
  planType: PlanTypeEnum;
  planPeriod: PlanPeriodEnum;
  addOns: AddOnsEnum[];
}

export interface IFormError {
  name: boolean;
  surname: boolean;
  email: boolean;
}

export interface updateFormProps {
  name: string;
  value: string;
}

export type FormContextType = {
  currentPage: number;
  setCurrentPage: (arg: number) => void;
  formInfo: IFormInfo;
  updateForm: (arg: updateFormProps) => void;
  formError: IFormError;
  setFormError: (arg: (prevState: IFormError) => IFormError) => void;
  checkFormError: () => boolean;
};

interface Props {
  children: React.ReactNode;
}

export const FormContext = React.createContext<FormContextType | null>(null);

const FormProvider: React.FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [formError, setFormError] = React.useState<IFormError>({
    name: false,
    surname: false,
    email: false,
  });
  const [formInfo, setFormInfo] = React.useState<IFormInfo>({
    name: "",
    surname: "",
    email: "",
    planType: PlanTypeEnum.Arcade,
    planPeriod: PlanPeriodEnum.Monthly,
    addOns: [AddOnsEnum.CustomizableProfile],
  });

  function checkFormError() {
    const errors = Object.values(formError).some((value) => value === true);
    const emptyValues = Object.values(formInfo).some((value) => value === "");
    return errors || emptyValues;
  }

  const updateForm = (arg: updateFormProps) => {
    const { name, value } = arg;
    if (name === "addOns") {
      const addOns = formInfo.addOns.includes(value as AddOnsEnum)
        ? formInfo.addOns.filter((item: AddOnsEnum) => item !== value)
        : [...formInfo.addOns, value];
  
      setFormInfo((prev: IFormInfo) => ({
        ...prev,
        [name]: addOns,
      }) as IFormInfo);
    } else {
      setFormInfo((prev: IFormInfo) => ({
        ...prev,
        [name]: value,
      }) as IFormInfo);
    }
  };

  return (
    <FormContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        formInfo,
        updateForm,
        formError,
        setFormError,
        checkFormError,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
