import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeActiveCard } from "../../../store/cardsSlice";

import Card from "../../Card/Card";

export default function CardsPage() {
  const {availableCardsList, activeCard} = useSelector(state => state.cards);
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(changeActiveCard(availableCardsList[0]))
  }, [])

  useEffect(() =>{}, [])
  return (
    <div>
      <div>
        <h1>Cards</h1>
      </div>
      <div>
        <Card />
      </div>
    </div>
  );
}
