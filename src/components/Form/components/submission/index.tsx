import styles from "./index.module.scss";
import iconThankYou from "../../../../assets/icon-thank-you.svg";

function Submission() {
  return (
    <div className={styles.container}>
        <img className={styles.icon} src={iconThankYou} alt="Icon Thank You" />
        <h1>Thank You!</h1>
        <p className={styles.message}>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com</p>
    </div>
  );
}

export default Submission;
