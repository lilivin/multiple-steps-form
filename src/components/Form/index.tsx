import { useContext } from "react";
import styles from "./index.module.scss";
import PersonalInfo from "./components/personalInfo";
import SelectPlan from "./components/selectPlan";
import Navigation from "./components/navigation";
import { FormContext, FormContextType } from "../../context/formContext";
import AddOns from "./components/addOns";
import Summary from "./components/summary";
import Submission from "./components/submission";

function Form() {
  const { currentPage } = useContext(FormContext) as FormContextType;

  const conditionalComponent = () => {
    switch (currentPage) {
      case 1:
        return <PersonalInfo />;
      case 2:
        return <SelectPlan />;
      case 3:
        return <AddOns />;
      case 4:
        return <Summary />;
      case 5:
        return <Submission />;
    }
  };

  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.content}>
        {conditionalComponent()}
      </div>
    </div>
  );
}

export default Form;
