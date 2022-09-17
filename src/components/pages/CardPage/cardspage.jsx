import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserThunk } from "../../../store/cardsSlice";

//styles
import styles from "./cardspage.module.scss";

//components
import Card from "../../Card/Card";
import CardsPlaceHolder from "./Cardplaceholder";

export default function CardsPage() {
  const { availableCardsList, activeCard, user } = useSelector(
    (state) => state.cards
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dispatch getUserThunk")
    dispatch(getUserThunk());
  }, [dispatch]);

  const name = user?.name;

  console.log(availableCardsList)

  return (
    <div>
      <div>
        <h1>Cards</h1>
      </div>
      <div>
        <h2>Active card</h2>
        {activeCard && <Card {...activeCard} cardHolderName={name} />}
      </div>
      <div>
        <h2>card list</h2>
        {availableCardsList.map((card) => (
          <CardsPlaceHolder key={card.cardNumber} cardNumber={card.cardNumber}>
            <Card {...card} cardHolderName={name} />
          </CardsPlaceHolder>
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
