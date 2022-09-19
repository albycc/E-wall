import styles from "./Plusbutton.module.scss";

export default function PlusButton({ func }) {
  return <button className={styles["plus-button"]} onClick={func}></button>;
}
