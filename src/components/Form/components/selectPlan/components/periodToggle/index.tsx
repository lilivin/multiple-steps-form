import { useContext, useState } from "react";
import styles from "./index.module.scss";
import {
  FormContext,
  FormContextType,
  PlanPeriodEnum,
} from "../../../../../../context/formContext";

function PeriodToggle() {
  const { formInfo, updateForm } = useContext(FormContext) as FormContextType;
  const [isToggled, setIsToggled] = useState<boolean>(
    formInfo.planPeriod === PlanPeriodEnum.Monthly ? false : true
  );

  function changePeriod() {
    setIsToggled((prev) => !prev);
    updateForm({
      name: "planPeriod",
      value: isToggled ? PlanPeriodEnum.Monthly : PlanPeriodEnum.Yearly,
    });
  }

  return (
    <div data-testid="period-toggle-container" className={styles.container} onClick={() => changePeriod()}>
      <span
        data-testid="period-toggle-name-monthly"
        className={`${styles.label} ${!isToggled && styles.active}`}
      >
        Monthly
      </span>
      <button
        data-testid="period-toggle-button"
        className={`${styles.toggleButton} ${
          isToggled ? styles.on : styles.off
        }`}
      >
        <span className={styles.pin} />
      </button>
      <span
        data-testid="period-toggle-name-yearly"
        className={`${styles.label} ${isToggled && styles.active}`}
      >
        Yearly
      </span>
    </div>
  );
}

export default PeriodToggle;
