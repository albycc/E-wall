import styles from "./Card.module.scss";

export default function Card({
  vendor,
  cardNumber,
  cardHolder,
  expireMonth,
  expireYear,
  ccv,
}) {
  return (
    <div className={styles["card-container"]}>
      <p>{vendor}</p>
      <p>{cardNumber}</p>
      <p>{cardHolder}</p>
      <p>{expireMonth}</p>
      <p>{expireYear}</p>
      <p>{ccv}</p>
    </div>
  );
}
