import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUserThunk } from "./store/cardsSlice";
import "./App.scss"

function App() {
  console.log("app")

  const dispatch = useDispatch()

  useEffect(() => {
    console.log("dispatch getUserThunk")
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
