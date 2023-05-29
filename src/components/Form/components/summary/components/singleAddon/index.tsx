import styles from "./index.module.scss";

function SingleAddon(props: {name: string, price: number}) {
  const {name, price} = props;

  return (
    <div className={styles.container}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>+${price}/mo</span>
    </div>
  );
}

export default SingleAddon;
