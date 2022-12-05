import { createRoutesFromElements, Route } from "react-router-dom";
import { CharacterOverview } from "./Screens/CharacterOverview/CharacterOverview";
import { CharacterSelection } from "./Screens/CharacterSelection/CharacterSelection";
import { Intro } from "./Screens/Intro/Intro";
import { NameSelection } from "./Screens/NameSelection/NameSelection";
import { SaveFileSelection } from "./Screens/SaveFileSelection/SaveFileSelection";
import { StarterSelection } from "./Screens/StarterSelection/StarterSelection";

export enum ROUTES {
  SAVEFILESELECTION = "/",
  INTRO = "/intro",
  NAMESELECTION = "/name-selection",
  CHARACTERSELECTION = "/character-selection",
  STARTERSELECTION = "/starter-selection",
  CHARACTEROVERVIEW = "/character-overview",
}

export const createdRoutes = createRoutesFromElements([
  <Route path={ROUTES.SAVEFILESELECTION} element={<SaveFileSelection />} />,
  <Route path={ROUTES.INTRO} element={<Intro />} />,
  <Route path={ROUTES.NAMESELECTION} element={<NameSelection />} />,
  <Route path={ROUTES.CHARACTERSELECTION} element={<CharacterSelection />} />,
  <Route path={ROUTES.CHARACTEROVERVIEW} element={<CharacterOverview />} />,
  <Route path={ROUTES.STARTERSELECTION} element={<StarterSelection />} />,
]);
