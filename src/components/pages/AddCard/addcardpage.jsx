import { useDispatch } from "react-redux";
import Card from "../../Card/Card";
import styles from "./addcardpage.module.scss";
import { addCard } from "../../../store/cardsSlice";
import { Link } from "react-router-dom";

export default function AddCardPage() {
  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const cardObject = {};

    formData.forEach((value, key) => (cardObject[key] = value));

    dispatch(addCard(cardObject));
  };
  return (
    <div>
      <div className={styles["section"]}>
        <h2>Add Card</h2>
      </div>
      <div className={styles["section"]}>
        <Card />
      </div>
      <div className={styles["section"]}>
        <div className={styles["form-frame"]}>
          <form className={styles["card-form"]} onSubmit={onFormSubmit}>
            <ul className={styles["list-inputs"]}>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="vendor">Vendor</label>
                  <select name="vendor">
                    <option value="American Express">American Express</option>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                  </select>
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="cardNumber">Card Number</label>
                  <input type="text" name="cardNumber" id="cardNumber" />
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="expireMonth">Card Number</label>
                  <input type="text" name="expireMonth" id="expireMonth" />
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="expireYear">Card Number</label>
                  <input type="text" name="expireYear" id="expireYear" />
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="ccv">Card Number</label>
                  <input type="text" name="ccv" id="ccv" />
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <button>Add Card</button>
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className={styles["section"]}>
        <Link to="/cards">
          <button>back</button>
        </Link>
      </div>
    </div>
  );
}
