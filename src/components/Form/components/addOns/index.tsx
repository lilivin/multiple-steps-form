import SingleAddOns from "./components/singleAddOns";
import { AddOnsEnum } from "../../../../context/formContext";
import styles from "./index.module.scss";
import FormHeader from "../formHeader";
import BottomNavigation from "../bottomNavigation";

function AddOns() {
  return (
    <div className={styles.container}>
      <div>
        <FormHeader
          title="Pick add-ons"
          subtitle="Add-ons help enhance your gaming experience."
        />
        <div className={styles.addonsContainer}>
          <SingleAddOns id={AddOnsEnum.OnlineService} />
          <SingleAddOns id={AddOnsEnum.LargerStorage} />
          <SingleAddOns id={AddOnsEnum.CustomizableProfile} />
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}

export default AddOns;
