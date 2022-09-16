import styles from "./Card.module.scss";

export default function Card({
  vendor,
  cardNumber,
  cardHolder,
  expireMonth,
  expireYear,
  ccv,
}) {
    const name = cardHolder?.name
  return (
    <div className={styles["card-container"]}>
      <p>{vendor}</p>
      <p>{cardNumber}</p>
      <p>{name?.first} {name?.last}</p>
      <p>{expireMonth}</p>
      <p>{expireYear}</p>
      <p>{ccv}</p>
    </div>
  );
}
