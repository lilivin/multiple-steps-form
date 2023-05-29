import { useContext } from "react";
import styles from "./index.module.scss";
import {
  FormContext,
  FormContextType,
} from "../../../../../../context/formContext";

function NavigationItem(props: { children: string; pageNumber: number }) {
  const { children, pageNumber } = props;

  const { currentPage, setCurrentPage, checkFormError } = useContext(
    FormContext
  ) as FormContextType;

  function nextPage() {
    if (checkFormError()) return;
    if (currentPage < 5) {
      setCurrentPage(pageNumber);
    }
  }

  return (
    <li
      className={`${styles.navigationItem} ${
        currentPage === pageNumber && styles.active
      }`}
      onClick={() => nextPage()}
    >
      <span className={styles.number}>{pageNumber}</span>
      <div className={styles.itemContent}>
        <span className={styles.step}>Step {pageNumber}</span>
        <p className={styles.pageName}>{children}</p>
      </div>
    </li>
  );
}

export default NavigationItem;
