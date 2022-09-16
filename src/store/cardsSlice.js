import { createSlice } from "@reduxjs/toolkit";

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
    ],
    activeCard: null,
  },
  reducers: {
    addCard: (state, { payload }) => {
      state.availableCardsList = state.availableCardsList.push(payload);
    },
    deleteCard: (state, { payload }) => {
      state.availableCardsList = state.availableCardsList.filter(
        (card) => card.cardNumber !== payload.cardNumber
      );
    },
    changeActiveCard: (state, { payload }) => {
      console.log(state);
      state.activeCard = state.availableCardsList.filter(
        (card) => card.cardNumber === payload
      )[0];
    },
  },
});

export const { addCard, deleteCard, changeActiveCard } = cardsSlice.actions;

const CardsReducer = cardsSlice.reducer;

export default CardsReducer;
