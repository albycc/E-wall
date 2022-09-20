import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import App from "./App";
import store from "./store/configStore";

import CardsPage from "./components/pages/CardPage/cardspage";
import AddCardPage from "./components/pages/AddCard/addcardpage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate replace to="cards" />} />
            <Route path="cards" element={<CardsPage />} />
            <Route path="addcard" element={<AddCardPage />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
);
