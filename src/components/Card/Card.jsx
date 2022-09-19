import { splitEveryNthChar } from "../../utilities/helperFunctions";
import styles from "./Card.module.scss";

export default function Card({
  vendor,
  bank,
  cardNumber,
  cardHolderName,
  expireMonth,
  expireYear,
  ccv,
  colour
}) {
  const name = cardHolderName
    ? `${cardHolderName?.first} ${cardHolderName?.last}`
    : "";
  const cardNumberFormat = !cardNumber ? "" : splitEveryNthChar(cardNumber, 4);
  const vendorName = !vendor ? "" : vendor?.toLowerCase().split(" ").join("");
  return (
    <div className={styles["card-container"]} style={{backgroundColor: colour}} >
      <div className={`${styles["card-row"]} ${styles["height-50"]}`}>
        <p className={styles["bank-title"]}>{bank}</p>
      </div>
      <div className={`${styles["card-row"]} ${styles["height-30"]}`}>
        <img src={require("../../img/creditchip.png")} alt="card chip" className={styles["chip-icon"]}></img>
      </div>
      <div className={`${styles["card-row"]} ${styles["centralize"]} ${styles["height-50"]}`}>
        <p className={`${styles["creditcard-numberformat"]} ${styles["silver-text"]}`}>{cardNumberFormat}</p>
      </div>
      <div className={`${styles["card-row"]} ${styles["centralize"]} ${styles["date-display"]} ${styles["silver-text"]} ${styles["height-30"]}`}>
        <span>{expireMonth}</span>
        <span className={styles["slash"]}>/</span>
        <span>{expireYear}</span>{" | "}
        <span>{ccv}</span>
      </div>
      <div className={`${styles["card-row"]} ${styles["space-between"]} ${styles["height-30"]}`}>
        <p className={styles["silver-text"]}>{name.toUpperCase()}</p>
        {vendorName && <img src={require(`../../img/${vendorName}.png`)} alt={`${vendor}'s bank icon`} className={styles["vendor-icon"]}/>}
      </div>
    </div>
  );
}
