import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { ROUTES } from "./routes";
import { Intro } from "./Screens/Intro/Intro";
import { NameSelection } from "./Screens/NameSelection/NameSelection";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path={ROUTES.INTRO} element={<Intro />} />,
    <Route path={ROUTES.NAMESELECTION} element={<NameSelection />} />,
  ])
);

root.render(
  <React.StrictMode>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </React.StrictMode>
);
