import styles from "./Card.module.scss";

export default function Card({
  vendor,
  cardNumber,
  cardHolderName,
  expireMonth,
  expireYear,
  ccv,
}) {

  const name = `${cardHolderName?.first} ${cardHolderName?.last}`;
  return (
    <div className={styles["card-container"]}>
      <p>{vendor}</p>
      <p>{cardNumber}</p>
      <p>{name.toUpperCase()}</p>
      <p>{expireMonth}</p>
      <p>{expireYear}</p>
      <p>{ccv}</p>
    </div>
  );
}
