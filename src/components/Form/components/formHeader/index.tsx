import styles from "./index.module.scss";

function FormHeader(props: {title: string, subtitle: string}) {
    const {title, subtitle} = props;
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <h3 className={styles.subtitle}>{subtitle}</h3>
    </div>
  );
}

export default FormHeader;
