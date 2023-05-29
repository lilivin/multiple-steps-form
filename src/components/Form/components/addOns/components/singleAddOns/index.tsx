import { useContext } from "react";
import styles from "./index.module.scss";
import {
  AddOnsEnum,
  FormContext,
  FormContextType,
} from "../../../../../../context/formContext";
import { getAddOnById } from "../../../../../../helpers/getAddOnsData";

function SingleAddOns(props: {
  id: AddOnsEnum;
}) {
  const { id } = props;
  const { formInfo, updateForm } = useContext(FormContext) as FormContextType;
  const addOn = getAddOnById(id);
  return (
    <label
      className={`${styles.container} ${
        formInfo.addOns.includes(id) ? styles.active : ""
      }`}
      htmlFor={id}
    >
      <input
        name="addOns"
        id={id}
        type="checkbox"
        className={styles.checkbox}
        value={id}
        checked={formInfo.addOns.includes(id)}
        onClick={() => updateForm({name: "addOns", value: id})}
      />
      <div className={styles.content}>
        <span className={styles.title}>{addOn.name}</span>
        <span className={styles.subtitle}>{addOn.subtitle}</span>
      </div>
      <span className={styles.price}>+${addOn.price}/mo</span>
    </label>
  );
}

export default SingleAddOns;
