import styles from "./index.module.scss";
import SinglePlan from "./components/singlePlan";
import PeriodToggle from "./components/periodToggle";
import { PlanTypeEnum } from "../../../../context/formContext";
import FormHeader from "../formHeader";
import BottomNavigation from "../bottomNavigation";

function SelectPlan() {
  return (
    <div data-testid="select-plan-container" className={styles.container}>
      <div>
        <FormHeader
          title="Select your plan"
          subtitle="You have the option of monthly or yearly billing."
        />
        <div className={styles.plansContainer}>
          <SinglePlan id={PlanTypeEnum.Arcade} />
          <SinglePlan id={PlanTypeEnum.Advanced} />
          <SinglePlan id={PlanTypeEnum.Pro} />
        </div>
        <PeriodToggle />
      </div>
      <BottomNavigation />
    </div>
  );
}

export default SelectPlan;
