import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Bia from "Bia";
import "./index.css"
// React Context Provider
import { MaterialUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <Bia />
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
