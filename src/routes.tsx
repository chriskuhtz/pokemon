import { createRoutesFromElements, Route } from "react-router-dom";
import { BattleScreen } from "./Screens/BattleScreen/BattleScreen";
import { CharacterOverview } from "./Screens/IntroScreens/CharacterOverview/CharacterOverview";
import { CharacterSelection } from "./Screens/IntroScreens/CharacterSelection/CharacterSelection";
import { Intro } from "./Screens/IntroScreens/Intro/Intro";
import { NameSelection } from "./Screens/IntroScreens/NameSelection/NameSelection";
import { SaveFileSelection } from "./Screens/IntroScreens/SaveFileSelection/SaveFileSelection";
import { SendOff } from "./Screens/IntroScreens/SendOff/SendOff";
import { StarterSelection } from "./Screens/IntroScreens/StarterSelection/StarterSelection";
import { OverWorldScreen } from "./Screens/OverworldScreen/OverworldScreen";
import { BagScreen } from "./Screens/PlayerMenuScreens/Bag/BagScreen";
import { PlayerMenu } from "./Screens/PlayerMenuScreens/PlayerMenu/PlayerMenu";
import { Pokedex } from "./Screens/PlayerMenuScreens/Pokedex/Pokedex";
import { SinglePokemonScreen } from "./Screens/PlayerMenuScreens/SinglePokemon/SinglePokemonScreen";
import { TrainerOverview } from "./Screens/PlayerMenuScreens/TrainerOverview/TrainerOverview";

export enum ROUTES {
  SAVEFILESELECTION = "/",
  //intro routes
  INTRO = "/intro/intro",
  NAMESELECTION = "/intro/name-selection",
  CHARACTERSELECTION = "/intro/character-selection",
  STARTERSELECTION = "/intro/starter-selection",
  CHARACTEROVERVIEW = "/intro/character-overview",
  SENDOFF = "/intro/send-off",
  //playerMenu routes
  PLAYERMENU = "/menu/player-menu",
  TRAINEROVERVIEW = "/menu/trainer-overview",
  POKEDEX = "/menu/pokedex",
  SINGLEPOKEMON = "/menu/pokemon",
  BAG = "/menu/bag",
  //overworld route
  OVERWORLD = "/overworld",
  //battle route
  BATTLE = "/battle",
}

export const createdRoutes = createRoutesFromElements([
  <Route path={ROUTES.SAVEFILESELECTION} element={<SaveFileSelection />} />,
  //intro routes
  <Route path={ROUTES.INTRO} element={<Intro />} />,
  <Route path={ROUTES.NAMESELECTION} element={<NameSelection />} />,
  <Route path={ROUTES.CHARACTERSELECTION} element={<CharacterSelection />} />,
  <Route path={ROUTES.CHARACTEROVERVIEW} element={<CharacterOverview />} />,
  <Route path={ROUTES.STARTERSELECTION} element={<StarterSelection />} />,
  <Route path={ROUTES.SENDOFF} element={<SendOff />} />,
  //playermenu routes
  <Route path={ROUTES.PLAYERMENU} element={<PlayerMenu />} />,
  <Route path={ROUTES.TRAINEROVERVIEW} element={<TrainerOverview />} />,
  <Route path={ROUTES.POKEDEX} element={<Pokedex />} />,
  <Route path={ROUTES.SINGLEPOKEMON} element={<SinglePokemonScreen />} />,
  <Route path={ROUTES.BAG} element={<BagScreen />} />,
  //overworld route
  <Route path={ROUTES.OVERWORLD} element={<OverWorldScreen />} />,
  //battle route
  <Route path={ROUTES.BATTLE} element={<BattleScreen />} />,
]);
