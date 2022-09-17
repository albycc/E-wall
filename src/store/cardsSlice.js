import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import cardData from "../data/cards.json";

export const getUserThunk = createAsyncThunk("cards/getUser", async () => {
  const response = await axios("https://randomuser.me/api/");
  if (response.status === 200) {
    return response.data.results[0];
  }
});

export const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    user: null,
    availableCardsList: [],
    activeCard: null,
  },
  reducers: {
    initCard: (state) => {
      if (state.activeCard === null) {
        state.activeCard = state.availableCardsList.shift();
      }
    },
    addCard: (state, { payload }) => {
      if ([...state.availableCardsList, state.activeCard].length >= 4) {
        alert("Error. Reached max 4 cards.");
        return;
      }
      console.log(payload);
      state.availableCardsList = [...state.availableCardsList, payload];
    },
    deleteCard: (state, { payload }) => {
      console.log(payload)
      state.availableCardsList = state.availableCardsList.filter(
        (card) => card.cardNumber !== payload
      );
    },
    changeActiveCard: (state, { payload }) => {
      const cardTemp = state.activeCard;
      state.activeCard = state.availableCardsList.find(
        (card) => card.cardNumber === payload
      );
      state.availableCardsList.push(cardTemp);
      state.availableCardsList = state.availableCardsList.filter(
        (card) => card.cardNumber !== payload
      );
    },
  },
  extraReducers: {
    [getUserThunk.fulfilled]: (state, { payload }) => {
      if (state.user === null) {
        state.user = payload;
        const {cards} = JSON.parse(JSON.stringify(cardData));
        state.availableCardsList = cards
        state.activeCard = state.availableCardsList.shift();
      }
    },
  },
});

export const { initCard, addCard, deleteCard, changeActiveCard } =
  cardsSlice.actions;

export default cardsSlice.reducer;
