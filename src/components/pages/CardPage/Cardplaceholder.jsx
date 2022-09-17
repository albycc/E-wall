import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeActiveCard } from "../../../store/cardsSlice";
import { deleteCard } from "../../../store/cardsSlice";

//components
import Cardsmenu from "./Cardsmenu";

import styles from "./Cardplaceholder.module.scss";

export default function CardsPlaceHolder({ cardNumber, children }) {
  const dispatch = useDispatch();

  const [menuPlaced, setMenuPlaced] = useState(false);
  const [menuCords, setMenuCords] = useState({ x: 0, y: 0 });

  const onCardClick = (event) => {
    // const cardNumber = event.target.dataset.cardNumber;
    // console.log(cardNumber);
    setMenuPlaced((prev) => !prev);
    console.log(event.clientX);
    console.log(event.clientY);
    setMenuCords({ x: event.clientX, y: event.clientY });

    // dispatch(changeActiveCard(cardNumber))
  };

  const setActiveCardHandler = () => {
    dispatch(changeActiveCard(cardNumber))
  }

  const deleteCardHandler = () => {
    dispatch(deleteCard(cardNumber))
  }

  const cordStyle = {
    left: menuCords.x,
    top: menuCords.y,
  };

  return (
    <div
      onClick={onCardClick}
      data-card-number={cardNumber}
      className={styles["card-placeholder"]}
    >
      {menuPlaced && <Cardsmenu cords={cordStyle} activeFunction={setActiveCardHandler} deleteFunction={deleteCardHandler} />}
      {children}
    </div>
  );
}
