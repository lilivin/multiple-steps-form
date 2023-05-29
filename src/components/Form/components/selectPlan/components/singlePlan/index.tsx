import { useContext } from "react";
import styles from "./index.module.scss";
import {
  FormContext,
  FormContextType,
  PlanPeriodEnum,
  PlanTypeEnum,
} from "../../../../../../context/formContext";
import { getBillingPlanById } from "../../../../../../helpers/getBillingPlans";
import { useDelayUnmount } from "../../../../../../helpers/useDelayUnmount";

function SinglePlan(props: { id: PlanTypeEnum }) {
  const { id } = props;
  const { formInfo, updateForm } = useContext(FormContext) as FormContextType;
  const plan = getBillingPlanById(id);

  const isYearly = formInfo.planPeriod === PlanPeriodEnum.Yearly ? true : false;

  const showErrorMessage = useDelayUnmount(isYearly, 450);
  return (
    <div
      className={`${styles.container} ${
        formInfo.planType === id ? styles.activePlan : ""
      }`}
      onClick={() => updateForm({ name: "planType", value: id })}
    >
      <img
        src={require(`../../../../../../assets/icon-${plan.name.toLowerCase()}.svg`)}
        alt={`${plan.name} plan icon`}
      />
      <div className={styles.content}>
        <span className={styles.name}>{plan.name}</span>
        <span className={styles.price}>
          $
          {formInfo.planPeriod === PlanPeriodEnum.Monthly
            ? plan.monthly
            : plan.yearly}
          /mo
        </span>
        {showErrorMessage && (
          <span
            className={`${styles.additionalText} ${
              isYearly ? styles.active : styles.disactive
            }`}
          >
            2 months free
          </span>
        )}
      </div>
    </div>
  );
}

export default SinglePlan;
