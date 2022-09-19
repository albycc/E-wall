import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//styles
import styles from "./cardspage.module.scss";

//components
import Card from "../../Card/Card";
import CardsPlaceHolder from "./Cardplaceholder";
import PlusButton from "../../UI/Plusbutton";

export default function CardsPage() {
  const { availableCardsList, activeCard, user } = useSelector(
    (state) => state.cards
  );

  const name = user?.name;

  console.log(availableCardsList);

  return (
    <div className="center-content">
      <div>
        <h1>Cards</h1>
      </div>
      <div>
        {activeCard && <Card {...activeCard} cardHolderName={name} />}
      </div>
      <div>
        <ul className={styles["cards-list"]}>
        {availableCardsList.map((card) => (
            <li key={card.cardNumber}>

              <CardsPlaceHolder
                cardNumber={card.cardNumber}
              >
                <Card {...card} cardHolderName={name} />
              </CardsPlaceHolder>
            </li>
        ))}
        </ul>
      </div>
      <div>
        <Link to="/addcard">
          <PlusButton />
        </Link>
      </div>
    </div>
  );
}
