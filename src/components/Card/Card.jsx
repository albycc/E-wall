import { useState } from "react";
import { splitEveryNthChar } from "../../utilities/helperFunctions";
import styles from "./Card.module.scss";
import { Fragment } from "react";
import CardMenu from "./CardMenu";

export default function Card({
  vendor,
  bank,
  cardNumber,
  cardHolderName,
  expireMonth,
  expireYear,
  ccv,
  colour,
  menuButtonOptions
}) {
  const [front, setFront] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  console.log(menuButtonOptions)

  const onCardClickHandler = () => {
    setMenuVisible((prev) => !prev);
  };

  const flipCard = () => {
    setFront(prev => !prev)
  }
  const name = cardHolderName
    ? `${cardHolderName?.first} ${cardHolderName?.last}`
    : "";

  const cardNumberFormat = !cardNumber ? "" : splitEveryNthChar(cardNumber, 4);
  const vendorName = !vendor ? "" : vendor?.toLowerCase().split(" ").join("");
  return (
    <div
      className={styles["card-container"]}
      style={{ backgroundColor: colour }}
      onClick={onCardClickHandler}
    >
      {menuVisible && <CardMenu menuButtonOptions={menuButtonOptions} cardNumber={cardNumber} flipFunction={flipCard} />}
      {front ? (
        <Fragment>
          <div className={`${styles["card-row"]} ${styles["height-50"]}`}>
            <p className={styles["bank-title"]}>{bank}</p>
          </div>
          <div className={`${styles["card-row"]} ${styles["height-30"]}`}>
            <img
              src={require("../../img/creditchip.png")}
              alt="card chip"
              className={styles["chip-icon"]}
            ></img>
          </div>
          <div
            className={`${styles["card-row"]} ${styles["centralize"]} ${styles["height-50"]}`}
          >
            <p
              className={`${styles["creditcard-numberformat"]} ${styles["silver-text"]}`}
            >
              {cardNumberFormat}
            </p>
          </div>
          <div
            className={`${styles["card-row"]} ${styles["centralize"]} ${styles["date-display"]} ${styles["silver-text"]} ${styles["height-30"]}`}
          >
            <span>{expireMonth}</span>
            <span className={styles["slash"]}>/</span>
            <span>{expireYear}</span>
          </div>
          <div
            className={`${styles["card-row"]} ${styles["space-between"]} ${styles["height-30"]}`}
          >
            <p className={styles["silver-text"]}>{name.toUpperCase()}</p>
            {vendorName && (
              <img
                src={require(`../../img/${vendorName}.png`)}
                alt={`${vendor}'s bank icon`}
                className={styles["vendor-icon"]}
              />
            )}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className={`${styles["card-row"]} ${styles["height-50"]}`}>
            <div className={styles["magnetic-strip"]}></div>
          </div>
          <div className={`${styles["card-row"]} ${styles["height-50"]}`}>
            <div className={`${styles["white-field"]} ${styles["name-field"]}`}>{`${cardHolderName.first} ${cardHolderName.last}`}</div>
            <div className={`${styles["white-field"]} ${styles["ccv-field"]}`}>{ccv}</div>
          </div>
          <div className={`${styles["card-row"]} ${styles["height-50"]}`}>
            <p className={styles["black-text"]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </Fragment>
      )}
    </div>
  );
}
