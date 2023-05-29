import { useContext } from "react";
import styles from "./index.module.scss";
import { FormContext, FormContextType } from "../../../../context/formContext";

function BottomNavigation() {
  const { currentPage, setCurrentPage, checkFormError } = useContext(
    FormContext
  ) as FormContextType;
  const firstPage = currentPage === 1 ? true : false;
  const lastPage = currentPage === 4 ? true : false;

  function nextPage() {
    if(checkFormError()) return;
    if (currentPage <= 5) {
      setCurrentPage(currentPage + 1);
    }
  }

  function previousPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className={`${styles.container} ${firstPage ? styles.firstPage : ""}`}>
      {!firstPage && (
        <button onClick={() => previousPage()} className={styles.prevButton}>
          Go Back
        </button>
      )}
      <button onClick={() => nextPage()} className={`${styles.nextButton} ${checkFormError() && styles.disactive}`}>
        {lastPage ? "Confirm" : "Next Step"}
      </button>
    </div>
  );
}

export default BottomNavigation;
