import { createRoutesFromElements, Route } from "react-router-dom";
import { CharacterOverview } from "./Screens/CharacterOverview/CharacterOverview";
import { CharacterSelection } from "./Screens/CharacterSelection/CharacterSelection";
import { Intro } from "./Screens/Intro/Intro";
import { NameSelection } from "./Screens/NameSelection/NameSelection";

export enum ROUTES {
  INTRO = "/",
  NAMESELECTION = "/name-selection",
  CHARACTERSELECTION = "/character-selection",
  CHARACTEROVERVIEW = "/character-overview",
}

export const createdRoutes = createRoutesFromElements([
  <Route path={ROUTES.INTRO} element={<Intro />} />,
  <Route path={ROUTES.NAMESELECTION} element={<NameSelection />} />,
  <Route path={ROUTES.CHARACTERSELECTION} element={<CharacterSelection />} />,
  <Route path={ROUTES.CHARACTEROVERVIEW} element={<CharacterOverview />} />,
]);
