import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initCard, changeActiveCard } from "../../../store/cardsSlice";

import Card from "../../Card/Card";

export default function CardsPage() {
  const { availableCardsList, activeCard } = useSelector(
    (state) => state.cards
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCard());
  }, [dispatch]);

  const onCardClick = (event) => {
    const cardNumber = event.target.dataset.cardNumber
    dispatch(changeActiveCard(cardNumber))
  }

  return (
    <div>
      <div>
        <h1>Cards</h1>
      </div>
      <div>
        <h2>Active card</h2>
        {activeCard && <Card {...activeCard} />}
      </div>
      <div>
        <h2>card list</h2>
        {availableCardsList.map((card) => (
          <div key={card.cardNumber} onClick={onCardClick} data-card-number={card.cardNumber}>
            <Card {...card}/>

          </div>
        ))}
      </div>
      <div>
        <Link to="/addcard">
          <button>+</button>
        </Link>
      </div>
    </div>
  );
}
