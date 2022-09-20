import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUserThunk } from "./store/cardsSlice";
import "./App.scss"

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserThunk());
  });
  return (
    <Fragment>
      <main className={"main-content"}>
        <Outlet />
      </main>

    </Fragment>
  );
}

export default App;
