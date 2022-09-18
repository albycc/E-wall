import { splitEveryNthChar } from "../../utilities/helperFunctions";
import styles from "./Card.module.scss";

export default function Card({
  vendor,
  cardNumber,
  cardHolderName,
  expireMonth,
  expireYear,
  ccv,
}) {

  const name = cardHolderName ? `${cardHolderName?.first} ${cardHolderName?.last}` : "";
  const cardNumberFormat = !cardNumber ? "" : splitEveryNthChar(cardNumber, 4)
  return (
    <div className={styles["card-container"]}>
      <p>{vendor}</p>
      <p>{cardNumberFormat}</p>
      <p>{name.toUpperCase()}</p>
      <p>{expireMonth}</p>
      <p>{expireYear}</p>
      <p>{ccv}</p>
    </div>
  );
}
