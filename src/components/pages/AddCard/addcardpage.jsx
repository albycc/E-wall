import { useDispatch, useSelector } from "react-redux";
import Card from "../../Card/Card";
import styles from "./addcardpage.module.scss";
import { addCard } from "../../../store/cardsSlice";
import { setMessage, hideMessage } from "../../../store/messageSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { splitEveryNthChar } from "../../../utilities/helperFunctions";
import Button from "../../UI/Button/Button";
import MessageBox from "../../MessageBox/MessageBox";



export default function AddCardPage() {
  const dispatch = useDispatch();
  const { user, availableCardsList } = useSelector((state) => state.cards);
  const [cardProps, setCardProps] = useState({});

  useEffect(() => {
    resetCardValues()
  }, []);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const inputs = Array.from(
      event.target.querySelectorAll("input[maxLength]")
    );

    const inputsAreNotFilled = inputs.some(
      (input) => cardProps[input.name].length < input.dataset.max
    );

    if (inputsAreNotFilled) {
      dispatch(setMessage({messageText:"Please fill out the required fields.", messageType:"error"}));
      setTimeout(() => dispatch(hideMessage()), 3000)
      return;
    }

    if(availableCardsList.length >= 3){
      dispatch(setMessage({messageText:"Unable to add card. User has reached max 4 card limit.", messageType:"error"}));
      setTimeout(() => dispatch(hideMessage()), 3000)
      return;
    }

    dispatch(addCard(cardProps));
    dispatch(setMessage({messageText:"Successfully added new card.", messageType:"success"}));
    setTimeout(() => dispatch(hideMessage()), 3000)
    event.target.reset()
    resetCardValues();
  };

  const resetCardValues = () => {
    const inputs = Array.from(document.querySelectorAll("input, select"));
    let props = {};
    inputs.forEach((input) => (props[input.name] = input.value));
    setCardProps(props);
  }

  const inputChangeHandler = (event) => {
    const propName = event.target.name;
    const propValue = event.target.value;
    setCardValues(propName, propValue);
  };

  const inputCardChangeHandler = (event) => {
    const propName = event.target.name;
    let propValue = event.target.value.split(" ").join("");
    propValue = numberValidate(propValue, event.target)
    const splitString = splitEveryNthChar(propValue, 4);
    event.target.value = splitString;
    
    setCardValues(propName, propValue);
  };

  const inputNumberHandler = (event) => {
    const propName = event.target.name;
    let propValue = event.target.value.split(" ").join("");
    propValue = numberValidate(propValue, event.target)
    setCardValues(propName, propValue);
  }

  const numberValidate = (value, input) => {
    let regex = /[a-öA-Ö]/g;
    if(regex.test(value)){
      value = value.slice(0, value.length-1);
      input.value = value;
    }
    return value;
  }

  const setCardValues = (prop, value) => {
    setCardProps((prev) => {
      return { ...prev, [prop]: value };
    });
  };


  return (
    <div className="center-content">
      <MessageBox/>
      <div className="header-section">
        <h1>Add Card</h1>
      </div>
      <div className="page-section">
        <Card cardHolderName={user?.name} {...cardProps} />
      </div>
      <div className="page-section">
        <div className={styles["form-frame"]}>
          <form className={styles["card-form"]} onSubmit={onFormSubmit}>
            <ul className={styles["list-inputs"]}>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="vendor">Vendor</label>
                  <select
                    name="vendor"
                    onChange={inputChangeHandler}
                    className={`${styles["width-long"]} ${styles["input-field"]}`}
                  >
                    <option value="American Express">American Express</option>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                  </select>
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    maxLength="19"
                    onInput={inputCardChangeHandler}
                    placeholder="xxxx xxxx xxxx xxxx"
                    data-max="16"
                    className={`${styles["width-long"]} ${styles["input-field"]}`}
                  />
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="bank">Bank name</label>
                  <input
                    type="text"
                    name="bank"
                    id="bank"
                    onInput={inputChangeHandler}
                    placeholder="Bankname"
                    className={`${styles["width-long"]} ${styles["input-field"]}`}
                  />
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-row"]}>
                  <div className={styles["input-column"]}>
                    <label htmlFor="expireMonth">Expire Date</label>
                    <div className={styles["two-input-field"]}>
                      <input
                        type="text"
                        name="expireMonth"
                        id="expireMonth"
                        maxLength="2"
                        onInput={inputNumberHandler}
                        placeholder="MM"
                        data-max="2"
                      />
                      {"/"}
                      <input
                        type="text"
                        name="expireYear"
                        id="expireYear"
                        maxLength="2"
                        onInput={inputNumberHandler}
                        placeholder="YY"
                        data-max="2"
                      />
                    </div>
                  </div>
                  <div className={styles["input-column"]}>
                    <label htmlFor="ccv">CCV</label>
                    <input
                      type="text"
                      name="ccv"
                      id="ccv"
                      maxLength="3"
                      onInput={inputNumberHandler}
                      placeholder="xxx"
                      data-max="3"
                      className={`${styles["width-short"]} ${styles["input-field"]}`}
                    />
                  </div>
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="colour">Colour</label>
                  <input
                    type="color"
                    name="colour"
                    id="colour"
                    defaultValue="#1f80ff"
                    onInput={inputChangeHandler}
                    className={`${styles["width-short"]} ${styles["input-field"]}`}
                  />
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <Button text="Add Card" />
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="page-section">
        <Link to="/cards">
          <Button text="Back" />
        </Link>
      </div>
    </div>
  );
}
