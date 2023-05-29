import { useContext } from "react";
import { FormContext, FormContextType } from "../../../../context/formContext";
import BottomNavigation from "../bottomNavigation";
import FormHeader from "../formHeader";
import styles from "./index.module.scss";
import SingleAddon from "./components/singleAddon";
import { getAddOnById } from "../../../../helpers/getAddOnsData";
import { getBillingPlanById } from "../../../../helpers/getBillingPlans";

function Summary() {
  const { formInfo, setCurrentPage } = useContext(FormContext) as FormContextType;
  const selectedPlan = getBillingPlanById(formInfo.planType);
  const planCost = selectedPlan[formInfo.planPeriod];

  const totalPrice = formInfo.addOns.reduce((accum,item) => accum + getAddOnById(item).price, 0)  + planCost;

  return (
    <div className={styles.container}>
      <div>
        <FormHeader
          title="Finishing up"
          subtitle="Double-check everything looks OK before confirming"
        />
        <div className={styles.summary}>
          <div className={styles.planContainer}>
            <div className={styles.plan}>
              <span className={styles.planName}>
                {selectedPlan.name} ({formInfo.planPeriod})
              </span>
              <button onClick={() => setCurrentPage(2)} className={styles.button}>Change</button>
            </div>
            <span className={styles.price}>${planCost}/mo</span>
          </div>
          <div className={styles.addonsContainer}>
            {formInfo.addOns.map((addOn) => {
              const addOnData = getAddOnById(addOn);
              return (
                <SingleAddon name={addOnData.name} price={addOnData.price} />
              );
            })}
          </div>
        </div>
        <div className={styles.finalPriceContainer}>
          <span>Total (per month)</span>
          <span className={styles.price}>+${totalPrice}/mo</span>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}

export default Summary;
