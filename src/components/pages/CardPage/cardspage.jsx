import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initCard } from "../../../store/cardsSlice";

import Card from "../../Card/Card";

export default function CardsPage() {
  const { availableCardsList, activeCard } = useSelector(
    (state) => state.cards
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCard());
  }, [dispatch]);

  console.log("cardspage activeCard: ", activeCard);
  console.log("cardspage list: ", availableCardsList);

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
          <Card {...card} />
        ))}
      </div>
      <div>
        <button>+</button>
      </div>
    </div>
  );
}
