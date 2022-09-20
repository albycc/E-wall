import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../../MessageBox/MessageBox";

//styles
import styles from "./cardspage.module.scss";

//components
import Card from "../../Card/Card";
import PlusButton from "../../UI/Plusbutton/Plusbutton";

export default function CardsPage() {
  const { availableCardsList, activeCard, user } = useSelector(
    (state) => state.cards
  );

  const name = user?.name;

  return (
    <div className="center-content">
      <MessageBox/>
      <div className="header-section">
        <h1>Cards</h1>
      </div>
      <div className="page-section">
        {activeCard && <Card {...activeCard} cardHolderName={name} />}
      </div>
      <div className="page-section">
        <ul className={styles["cards-list"]}>
        {availableCardsList.map((card) => (
            <li key={card.cardNumber}>
              <Card {...card} cardHolderName={name} menuButtonOptions={{deleteOption:true, activeOption:true}} />

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
