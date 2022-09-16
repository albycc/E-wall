import { configureStore } from "@reduxjs/toolkit";
import CardsReducer from "./cardsSlice";

const store = configureStore({
  reducer: { cards: CardsReducer },
});

export default store;
