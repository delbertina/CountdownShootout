import GamePlayPage from "./pages/game-play-page";
import GameListPage from "./pages/game-list-page";
import HomePage from "./pages/home-page";
import { useEffect, useMemo, useRef } from "react";
import "./App.css";
import { useGameStore } from "./store/gameStore";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import DebugDialog from "./components/debug-dialog";
import TeamOptionsPage from "./pages/team-options-page";
import { getTeamDisplayName } from "./types/state_types";
import ManageGamesDialog from "./components/manage-games-dialog";
import EditGameDialog from "./components/edit-game-dialog";
import ViewGameDialog from "./components/view-game-dialog";
import ImportGamesDialog from "./components/import-games-dialog";

const App = () => {
  const currentGame = useGameStore((state) => state.currentGame);
  const gamepadButtonPress = useGameStore((state) => state.gamepadButtonPress);
  const { toast } = useToast();
  const teams = useGameStore((state) => state.teams);
  const teamLastPresses = useMemo(
    () => teams.map((team) => ({ teamId: team.id, lastPress: team.lastPress })),
    [teams]
  );
  const lastToastTime = useRef(0);

  const throwToast = (teamId: number) => {
    const foundTeam = teams.find((team) => team.id === teamId);
    if (!foundTeam) return;
    toast({
      title: getTeamDisplayName(foundTeam) + " Buzzed",
      variant: foundTeam.theme,
    });
  };

  useEffect(() => {
    const maxTeamPress = Math.max(
      ...teamLastPresses.map((team) => team.lastPress)
    );
    if (
      maxTeamPress > lastToastTime.current &&
      teamLastPresses.some((team) => team.lastPress > 0)
    ) {
      throwToast(
        teamLastPresses.find((team) => team.lastPress === maxTeamPress)!.teamId
      );
      lastToastTime.current = maxTeamPress;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamLastPresses]);

  // Only run the effect once - React 18 dev mode bug that they don't think is a bug
  const effectRan = useRef(false);
  useEffect(() => {
    if (!effectRan.current) {
      // @ts-expect-error (Firefox experimental event)
      window.addEventListener(
        "gamepadbuttondown",
        (evt: { gamepad: Gamepad; button: number }) => {
          gamepadButtonPress(evt);
        }
      );
      console.log("Listening for gamepad button presses...");
    }
    return () => {
      effectRan.current = true;
    };
    //
    // empty array to only run on first render
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HomePage />
      <TeamOptionsPage />
      {!currentGame && <GameListPage />}
      {currentGame && <GamePlayPage />}
      <Toaster />
      <DebugDialog />
      <ImportGamesDialog />
      <ManageGamesDialog />
      <EditGameDialog />
      <ViewGameDialog />
    </>
  );
};

export default App;
