import { useDispatch, useSelector } from "react-redux";
import Card from "../../Card/Card";
import styles from "./addcardpage.module.scss";
import { addCard } from "../../../store/cardsSlice";
import { Link } from "react-router-dom";
import { useEffect, useReducer, useRef, useState } from "react";
import { splitEveryNthChar } from "../../../utilities/helperFunctions";
import Button from "../../UI/Button/Button";
import MessageBox from "./MessageBox";

const messageReducer = (state, action) => {
  if (action.type === "setVisible") {
    return { ...state, visible: action.visibleValue };
  }
  if (action.type === "setMessage") {
    return { visible: true, messageText: action.message, messageType:action.messageType };
  }
  return { visible: false, messageText: "", messageType:"" };
};

export default function AddCardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.cards);
  const [cardProps, setCardProps] = useState({});
  const [messageState, dispatchMessage] = useReducer(messageReducer, {
    visible: false,
    messageText: "",
    messageType:null
  });
  const vendorDropdown = useRef();

  useEffect(() => {
    const inputs = Array.from(document.querySelectorAll("input"));
    const selectVendor = document.querySelector("select");
    const inputColour = document.querySelector("input#colour");
    let props = {};
    inputs.forEach((input) => (props[input.name] = ""));
    props[selectVendor.name] = selectVendor.value;
    props[inputColour.name] = inputColour.value;
    console.log(props);
    setCardProps(props);
  }, []);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const inputs = Array.from(
      event.target.querySelectorAll("input[maxLength]")
    );

    const formData = new FormData(event.target);

    const cardObject = {};

    formData.forEach(
      (value, key) => (cardObject[key] = value.split(" ").join(""))
    );

    const inputsAreNotFilled = inputs.some(
      (input) => cardObject[input.name].length < input.dataset.max
    );

    if (inputsAreNotFilled) {
      setMessage("Please fill out the required fields.", "error")
      return;
    }

    dispatch(addCard(cardObject));
    setMessage("Succesfully added new card.", "success")
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

  const setMessage = (text, type) => {
    dispatchMessage({
      type: "setMessage",
      message: text,
      messageType:type
    });
    setTimeout(
      () => dispatchMessage({ type: "setVisible", visibleValue: false }),
      3000
    );
  }

  return (
    <div className="center-content">
      {messageState.visible && (
       <MessageBox textMessage={messageState.messageText} messageType={messageState.messageType}/>
      )}
      <div className="page-section">
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
                    ref={vendorDropdown}
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
                    onChange={inputCardChangeHandler}
                    placeholder="xxxx xxxx xxxx xxxx"
                    data-max="16"
                    className={styles["width-long"]}
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
                    onChange={inputChangeHandler}
                    placeholder="Bankname"
                    className={styles["width-long"]}
                  />
                </div>
              </li>
              <li className={styles["list-item"]}>
                <div className={styles["input-row"]}>
                  <div className={styles["input-column"]}>
                    <label htmlFor="expireMonth">Month</label>
                    <input
                      type="text"
                      name="expireMonth"
                      id="expireMonth"
                      maxLength="2"
                      onChange={inputMonthChangeHandler}
                      placeholder="xx"
                      data-max="2"
                      className={styles["width-short"]}
                    />
                  </div>
                  <div className={styles["input-column"]}>
                    <label htmlFor="expireYear">Year</label>
                    <input
                      type="text"
                      name="expireYear"
                      id="expireYear"
                      maxLength="2"
                      onChange={inputChangeHandler}
                      placeholder="xx"
                      data-max="2"
                      className={styles["width-short"]}
                    />
                  </div>
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
                    className={styles["width-short"]}
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
                    onChange={inputChangeHandler}
                    className={styles["width-short"]}
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
