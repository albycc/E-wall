import { useState } from "react";
import styles from "./Card.module.scss"
import { useDispatch } from "react-redux";
import { changeActiveCard, deleteCard } from "../../store/cardsSlice";
import { setMessage, hideMessage } from "../../store/messageSlice";

export default function CardMenu({ menuButtonOptions={}, cardNumber, flipFunction }) {

    const [options] = useState(menuButtonOptions)


    const dispatch = useDispatch()

    const flipButtonHandler = () => {
        flipFunction()
    }

    const setActiveCardHandler = () => {
        dispatch(changeActiveCard(cardNumber))
      }
    
      const deleteCardHandler = () => {
        dispatch(deleteCard(cardNumber));
        dispatch(setMessage({messageText:"Card deleted.", messageType:"success"}));
        setTimeout(() => dispatch(hideMessage()), 3000)
      }
  return (
    <div className={styles["card-menu"]}>
      <button onClick={flipButtonHandler} title="flip card"><img src={require("../../img/flip-icon.png")} alt="flip cards" /></button>
      {options.activeOption &&  <button onClick={setActiveCardHandler} title="Set card as active"><img src={require("../../img/active-icon.png")} alt="set card as active"/></button>}
      {options.deleteOption && <button onClick={deleteCardHandler} title="Delete card"><img src={require("../../img/bin-icon.png")} alt="delete card"/></button>}
    </div>
  );
}
