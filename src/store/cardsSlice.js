import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserThunk = createAsyncThunk("cards/getUser", async () => {
  const response = await axios("https://randomuser.me/api/");
  console.log(response);
  if(response.status === 200){
    return response.data.results[0]
    
  }
});

export const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    user: null,
    availableCardsList: [
      {
        vendor: "American Express",
        cardNumber: "6666-6666-6666-6666",
        expireMonth: "12",
        expireYear: "26",
        ccv: "012",
      },
      {
        vendor: "Visa",
        cardNumber: "9999-9999-9999-9999",
        expireMonth: "12",
        expireYear: "26",
        ccv: "123",
      },
      {
        vendor: "MaserCard",
        cardNumber: "8888-8888-8888-8888",
        expireMonth: "12",
        expireYear: "26",
        ccv: "123",
      },
    ],
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
      state.availableCardsList = state.availableCardsList.filter(
        (card) => card.cardNumber !== payload.cardNumber
      );
    },
    changeActiveCard: (state, { payload }) => {
      console.log(
        state.availableCardsList.find((card) => card.cardNumber === payload)
      );
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
  extraReducers:{
    [getUserThunk.fulfilled]:(state, {payload}) => {
      console.log(payload);
      state.user = payload

    }
  }
});

export const { initCard, addCard, deleteCard, changeActiveCard } =
  cardsSlice.actions;

export default cardsSlice.reducer;
