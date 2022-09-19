import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//styles
import styles from "./cardspage.module.scss";

//components
import Card from "../../Card/Card";
import CardsPlaceHolder from "./Cardplaceholder";
import PlusButton from "../../UI/Plusbutton/Plusbutton";

export default function CardsPage() {
  const { availableCardsList, activeCard, user } = useSelector(
    (state) => state.cards
  );

  const name = user?.name;

  console.log(availableCardsList);

  return (
    <div className="center-content">
      <div className="page-section">
        <h1>Cards</h1>
      </div>
      <div className="page-section">
        {activeCard && <Card {...activeCard} cardHolderName={name} />}
      </div>
      <div className="page-section">
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
      <div className="page-section">
        <Link to="/addcard">
          <PlusButton />
        </Link>
      </div>
    </div>
  );
}
