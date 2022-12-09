import { createRoutesFromElements, Route } from "react-router-dom";
import { CharacterOverview } from "./Screens/IntroScreens/CharacterOverview/CharacterOverview";
import { CharacterSelection } from "./Screens/IntroScreens/CharacterSelection/CharacterSelection";
import { Intro } from "./Screens/IntroScreens/Intro/Intro";
import { NameSelection } from "./Screens/IntroScreens/NameSelection/NameSelection";
import { SaveFileSelection } from "./Screens/IntroScreens/SaveFileSelection/SaveFileSelection";
import { SendOff } from "./Screens/IntroScreens/SendOff/SendOff";
import { StarterSelection } from "./Screens/IntroScreens/StarterSelection/StarterSelection";

export enum ROUTES {
  SAVEFILESELECTION = "/",
  INTRO = "/intro",
  NAMESELECTION = "/name-selection",
  CHARACTERSELECTION = "/character-selection",
  STARTERSELECTION = "/starter-selection",
  CHARACTEROVERVIEW = "/character-overview",
  SENDOFF = "/send-off",
}

export const createdRoutes = createRoutesFromElements([
  <Route path={ROUTES.SAVEFILESELECTION} element={<SaveFileSelection />} />,
  <Route path={ROUTES.INTRO} element={<Intro />} />,
  <Route path={ROUTES.NAMESELECTION} element={<NameSelection />} />,
  <Route path={ROUTES.CHARACTERSELECTION} element={<CharacterSelection />} />,
  <Route path={ROUTES.CHARACTEROVERVIEW} element={<CharacterOverview />} />,
  <Route path={ROUTES.STARTERSELECTION} element={<StarterSelection />} />,
  <Route path={ROUTES.SENDOFF} element={<SendOff />} />,
]);
