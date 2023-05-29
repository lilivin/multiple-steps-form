import { useContext } from "react";
import {
  FormContext,
  FormContextType,
  IFormError,
  IFormInfo,
} from "../../../../../../context/formContext";
import styles from "./index.module.scss";
import { useDelayUnmount } from "../../../../../../helpers/useDelayUnmount";

function Input(props: {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  pattern: RegExp;
  errorMessage: string;
}) {
  const { placeholder, type, name, label, pattern, errorMessage } = props;
  const { updateForm, formInfo, formError, setFormError } = useContext(
    FormContext
  ) as FormContextType;

  const inputError = formError[name as keyof IFormError];
  const showErrorMessage = useDelayUnmount(inputError, 450);

  function checkInputOnBlur(value: string) {
    if (!pattern.test(value)) {
      setFormError((prevState: IFormError) => ({
        ...prevState,
        [name]: true,
      }));
    } else {
      setFormError((prevState: IFormError) => ({
        ...prevState,
        [name]: false,
      }));
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={formInfo[name as keyof IFormInfo]}
        onBlur={(e) => checkInputOnBlur(e.target.value)}
        className={`${styles.input} ${inputError && styles.error}`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          updateForm({ name: e.target.name, value: e.target.value })
        }
      />
      {showErrorMessage && (
        <span
          className={`${styles.errorMessage} ${
            inputError ? styles.active : styles.disactive
          }`}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default Input;
