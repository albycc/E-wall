import { createSlice } from "@reduxjs/toolkit";
import store from "./configStore";

export const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    user: null,
    availableCardsList: [
      {
        vendor: "American Express",
        cardNumber: "6666-6666-6666-6666",
        cardHolder: "Test Testsson",
        expireMonth: "12",
        expireYear: "26",
        ccv: "012",
      },
      {
        vendor: "Visa",
        cardNumber: "9999-9999-9999-9999",
        cardHolder: "Test Testsson",
        expireMonth: "12",
        expireYear: "26",
        ccv: "123",
      },
      {
        vendor: "MaserCard",
        cardNumber: "8888-8888-8888-8888",
        cardHolder: "Test Testsson",
        expireMonth: "12",
        expireYear: "26",
        ccv: "123",
      },
    ],
    activeCard: null,
  },
  reducers: {
    initCard:(state) => {
      if(state.activeCard === null){
        state.activeCard = state.availableCardsList.shift()

      }
    },
    addCard: (state, { payload }) => {
      state.availableCardsList = state.availableCardsList.push(payload);
    },
    deleteCard: (state, { payload }) => {
      state.availableCardsList = state.availableCardsList.filter(
        (card) => card.cardNumber !== payload.cardNumber
      );
    },
    changeActiveCard: (state, { payload }) => {
      console.log(state.availableCardsList.find(card => card.cardNumber === payload))
      const cardTemp = state.activeCard;
      state.activeCard = state.availableCardsList.find(card => card.cardNumber === payload);
      state.availableCardsList.push(cardTemp);
      state.availableCardsList = state.availableCardsList.filter(card => card.cardNumber !== payload)
      // state.availableCardsList = state.availableCardsList.filter(card => card.cardNumber !== payload)
    },
  },
});

export const { initCard, addCard, deleteCard, changeActiveCard } = cardsSlice.actions;

export default cardsSlice.reducer;

