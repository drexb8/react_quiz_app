import { useEffect, useReducer } from "react";
import Content from "./Content";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";

const initialState = {
  questions: [],
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchData() {
      try {
        //fetch fake API
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Content>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
      </Content>
    </div>
  );
}
