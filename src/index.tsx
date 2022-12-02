import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Intro } from "./Screens/Intro/Intro";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Intro />
  </React.StrictMode>
);
