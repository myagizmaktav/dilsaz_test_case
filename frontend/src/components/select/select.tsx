import styles from "./select.module.scss";

export const Select = () => {
  return (
    <select className={styles.select}>
      <option className={styles.option} value="1">
        1
      </option>
      <option className={styles.option} value="2">
        2
      </option>
    </select>
  );
};
