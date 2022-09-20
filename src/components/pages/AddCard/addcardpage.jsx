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
    return {
      visible: true,
      messageText: action.message,
      messageType: action.messageType,
    };
  }
  return { visible: false, messageText: "", messageType: "" };
};

export default function AddCardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.cards);
  const [cardProps, setCardProps] = useState({});
  const [messageState, dispatchMessage] = useReducer(messageReducer, {
    visible: false,
    messageText: "",
    messageType: null,
  });
  const vendorDropdown = useRef();

  useEffect(() => {
    const inputs = Array.from(document.querySelectorAll("input, select"));
    console.log(inputs);
    let props = {};
    inputs.forEach((input) => (props[input.name] = input.value));
    console.log(props);
    setCardProps(props);
  }, []);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const inputs = Array.from(
      event.target.querySelectorAll("input[maxLength]")
    );

    console.log(cardProps)

    const inputsAreNotFilled = inputs.some(
      (input) => cardProps[input.name].length < input.dataset.max
    );

    if (inputsAreNotFilled) {
      setMessage("Please fill out the required fields.", "error");
      return;
    }

    dispatch(addCard(cardProps));
    setMessage("Succesfully added new card.", "success");
  };

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
      console.log("contains letters");
      value = value.slice(0, value.length-1);
      console.log("propValue:", value)
      input.value = value;
    }
    return value;
  }

  const setCardValues = (prop, value) => {
    setCardProps((prev) => {
      return { ...prev, [prop]: value };
    });
  };

  const setMessage = (text, type) => {
    dispatchMessage({
      type: "setMessage",
      message: text,
      messageType: type,
    });
    setTimeout(
      () => dispatchMessage({ type: "setVisible", visibleValue: false }),
      3000
    );
  };

  console.log(cardProps);
  return (
    <div className="center-content">
      {messageState.visible && (
        <MessageBox
          textMessage={messageState.messageText}
          messageType={messageState.messageType}
        />
      )}
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
                    ref={vendorDropdown}
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
