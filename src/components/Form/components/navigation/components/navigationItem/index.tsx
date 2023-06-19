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

  function changePage() {
    if (checkFormError()) return;
    if (currentPage < 5) {
      setCurrentPage(pageNumber);
    }
  }

  return (
    <li
      data-testid="navigation-item"
      className={`${styles.navigationItem} ${
        currentPage === pageNumber && styles.active
      }`}
      onClick={() => changePage()}
    >
      <span data-testid="navigation-item-page-number" className={styles.number}>{pageNumber}</span>
      <div className={styles.itemContent}>
        <span data-testid="navigation-item-step-number" className={styles.step}>Step {pageNumber}</span>
        <p data-testid="navigation-item-step-name" className={styles.pageName}>{children}</p>
      </div>
    </li>
  );
}

export default NavigationItem;
