import { useDispatch, useSelector } from "react-redux";
import Card from "../../Card/Card";
import styles from "./addcardpage.module.scss";
import { addCard } from "../../../store/cardsSlice";
import { Link } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { splitEveryNthChar } from "../../../utilities/helperFunctions";

const messageReducer = (state, action) => {
  if (action.type === "setVisible") {
    return { ...state, visible: action.visibleValue };
  }
  if (action.type === "setMessage") {
    return { visible:true, messageText: action.message };
  }
  return { visible: false, messageText: "" };
};

export default function AddCardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.cards);
  const [cardProps, setCardProps] = useState({});
  const [messageState, dispatchMessage] = useReducer(messageReducer, {
    visible: false,
    messageText: "",
  });

  useEffect(() => {
    const inputs = Array.from(document.querySelectorAll("input"));
    const selectVendor = document.querySelector("select");
    let props = { [selectVendor.name]: selectVendor.value };
    inputs.forEach((input) => (props[input.name] = ""));
    setCardProps(props);
  }, []);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const inputs = Array.from(event.target.querySelectorAll("input"));

    const formData = new FormData(event.target);

    const cardObject = {};

    formData.forEach(
      (value, key) => (cardObject[key] = value.split(" ").join(""))
    );

    const inputsAreNotFilled = inputs.some(
      (input) => cardObject[input.name].length < input.dataset.max
    );

    if (inputsAreNotFilled) {
      dispatchMessage({type:"setMessage", message:"Please fill out the required fields."});
      setTimeout(() => dispatchMessage({type:"setVisible", visibleValue:false}), 3000);
      return;
    }

    dispatch(addCard(cardObject));
    dispatchMessage({type:"setMessage", message:"Added new card."})
    setTimeout(() => dispatchMessage({type:"setVisible", visibleValue:false}), 3000);

  };

  const inputChangeHandler = (event) => {
    const propName = event.target.name;
    const propValue = event.target.value.split(" ").join("");
    setCardValues(propName, propValue);
  };

  const inputCardChangeHandler = (event) => {
    const propName = event.target.name;
    const propValue = event.target.value.split(" ").join("");
    const splitString = splitEveryNthChar(propValue, 4);
    event.target.value = splitString;
    setCardValues(propName, propValue);
  };

  const inputMonthChangeHandler = (event) => {
    const propName = event.target.name;
    const propValue = event.target.value.split(" ").join("");
    setCardValues(propName, propValue);
  };

  const setCardValues = (prop, value) => {
    setCardProps((prev) => {
      return { ...prev, [prop]: value };
    });
  };

  console.log(messageState);

  return (
    <div>
      {messageState.visible  && <div><p>{messageState.messageText}</p></div>}
      <div className={styles["section"]}>
        <h2>Add Card</h2>
      </div>
      <div className={styles["section"]}>
        <Card cardHolderName={user?.name} {...cardProps} />
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
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    maxLength="19"
                    onChange={inputCardChangeHandler}
                    placeholder="xxxx xxxx xxxx xxxx"
                    data-max="16"
                  />
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="expireMonth">Expire Month</label>
                  <input
                    type="text"
                    name="expireMonth"
                    id="expireMonth"
                    maxLength="2"
                    onChange={inputMonthChangeHandler}
                    placeholder="xx"
                    data-max="2"
                  />
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="expireYear">Expire Year</label>
                  <input
                    type="text"
                    name="expireYear"
                    id="expireYear"
                    maxLength="2"
                    onChange={inputChangeHandler}
                    placeholder="xx"
                    data-max="2"
                  />
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-column"]}>
                  <label htmlFor="ccv">CCV</label>
                  <input
                    type="text"
                    name="ccv"
                    id="ccv"
                    maxLength="3"
                    onChange={inputChangeHandler}
                    placeholder="xxx"
                    data-max="3"
                  />
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
