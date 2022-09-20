import { configureStore } from "@reduxjs/toolkit";
import CardsReducer from "./cardsSlice";
import MessageReducer from "./messageSlice"

const store = configureStore({
  reducer: { cards: CardsReducer,
  textMessage: MessageReducer},
});

export default store;
