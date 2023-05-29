import Form from "./components/Form";
import FormProvider from "./context/formContext";
import styles from "./App.module.scss";

function App() {
  return (
    <FormProvider>
      <div className={styles.app}>
        <Form />
      </div>
    </FormProvider>
  );
}

export default App;
