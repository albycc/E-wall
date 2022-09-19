import { useState } from "react";
import styles from "./Card.module.scss"
import { useDispatch } from "react-redux";
import { changeActiveCard, deleteCard } from "../../store/cardsSlice";

export default function CardMenu({ menuButtonOptions={}, cardNumber, flipFunction }) {

    const [options, SetOptions] = useState(menuButtonOptions)


    const dispatch = useDispatch()

    const flipButtonHandler = () => {
        flipFunction()
    }

    const setActiveCardHandler = () => {
        dispatch(changeActiveCard(cardNumber))
      }
    
      const deleteCardHandler = () => {
        dispatch(deleteCard(cardNumber))
      }
  return (
    <div className={styles["card-menu"]}>
      <button onClick={flipButtonHandler}>Flip</button>
      {options.activeOption &&  <button onClick={setActiveCardHandler}>Set Active</button>}
      {options.deleteOption && <button onClick={deleteCardHandler}>Delete</button>}
    </div>
  );
}
