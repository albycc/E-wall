import { useDispatch, useSelector } from "react-redux";
import Card from "../../Card/Card";
import styles from "./addcardpage.module.scss";
import { addCard } from "../../../store/cardsSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AddCardPage() {
  const dispatch = useDispatch();
  const {user, activeCard} = useSelector(state => state.cards);
  const [cardProps, setCardProps] = useState({});

  const onFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const cardObject = {};

    formData.forEach((value, key) => (cardObject[key] = value));

    dispatch(addCard(cardObject));
  };

  const inputChangeHandler = (event) => {
    const propName = event.target.name;
    const propValue = event.target.value;
    setCardProps(prev => {return {...prev, [propName]:propValue}})
  }

  console.log(cardProps)
  return (
    <div>
      <div className={styles["section"]}>
        <h2>Add Card</h2>
      </div>
      <div className={styles["section"]}>
        <Card cardHolderName={user?.name} {...cardProps}/>
      </div>
      <div className={styles["section"]}>
        <div className={styles["form-frame"]}>
          <form className={styles["card-form"]} onSubmit={onFormSubmit}>
            <ul className={styles["list-inputs"]}>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="vendor">Vendor</label>
                  <select name="vendor" onChange={inputChangeHandler}>
                    <option value="American Express">American Express</option>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                  </select>
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="cardNumber">Card Number</label>
                  <input type="text" name="cardNumber" id="cardNumber" maxLength="19" onChange={inputChangeHandler}/>
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="expireMonth">Expire Month</label>
                  <input type="text" name="expireMonth" id="expireMonth" maxLength="2" onChange={inputChangeHandler}/>
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="expireYear">Expire Year</label>
                  <input type="text" name="expireYear" id="expireYear" maxLength="2" onChange={inputChangeHandler}/>
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="ccv">CCV</label>
                  <input type="text" name="ccv" id="ccv" maxLength="3" onChange={inputChangeHandler}/>
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
