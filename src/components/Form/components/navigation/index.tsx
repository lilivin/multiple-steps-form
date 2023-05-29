import styles from "./index.module.scss";
import NavigationItem from "./components/navigationItem";
import bgElement1 from "../../../../assets/bg-element-1.svg";
import bgElement2 from "../../../../assets/bg-element-2.svg";
import bgElement3 from "../../../../assets/bg-element-3.svg";
import { FormContext, FormContextType } from "../../../../context/formContext";
import { useContext } from "react";

function Navigation() {
  const { currentPage } = useContext(FormContext) as FormContextType;
  const dynamicClass = "backgroundVariant" + currentPage;
  return (
    <div className={styles.navigation}>
      <ul className={styles.navigationList}>
        <NavigationItem pageNumber={1}>Your Info</NavigationItem>
        <NavigationItem pageNumber={2}>Select Plan</NavigationItem>
        <NavigationItem pageNumber={3}>Add-Ons</NavigationItem>
        <NavigationItem pageNumber={4}>Summary</NavigationItem>
      </ul>
      <img
        className={`${styles.backgroundElement1} ${styles[dynamicClass]}`}
        src={bgElement1}
        alt="Background Element"
      />
      <img
        className={`${styles.backgroundElement2} ${styles[dynamicClass]}`}
        src={bgElement2}
        alt="Background Element"
      />
      <img
        className={`${styles.backgroundElement3} ${styles[dynamicClass]}`}
        src={bgElement3}
        alt="Background Element"
      />
    </div>
  );
}

export default Navigation;
