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

  const showInfoMessage = useDelayUnmount(isYearly, 450);
  return (
    <div
      data-testid="plan-container"
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
        <span data-testid="plan-name" className={styles.name}>
          {plan.name}
        </span>
        <span data-testid="plan-price" className={styles.price}>
          $
          {formInfo.planPeriod === PlanPeriodEnum.Monthly
            ? plan.monthly
            : plan.yearly}
          /mo
        </span>
        {showInfoMessage && (
          <span
            data-testid="plan-error"
            className={`${styles.additionalText} ${
              isYearly ? styles.active : styles.disactive
            }`}
          >
            2 Months Free
          </span>
        )}
      </div>
    </div>
  );
}

export default SinglePlan;
