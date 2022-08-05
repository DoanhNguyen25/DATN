import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RouterConfig from "./navigation/RouterConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>

      <ToastContainer
        hideProgressBar
        position="top-center"
        autoClose={2000}
        closeButton={false}
      />
    </>
  );
}

export default App;
