import GamePlayPage from "./pages/game-play-page";
import GameListPage from "./pages/game-list-page";
import HomePage from "./pages/home-page";
import { useEffect, useRef } from "react";
import "./App.css";
import { useGameStore } from "./store/gameStore";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import DebugDialog from "./components/debug-dialog";

const App = () => {
  const currentGame = useGameStore((state) => state.currentGame);
  const gamepadButtonPress = useGameStore((state) => state.gamepadButtonPress);
  const { toast } = useToast();
  const lastTeam1Press = useGameStore((state) => state.lastTeam1Press);
  const lastTeam2Press = useGameStore((state) => state.lastTeam2Press);
  const team1Theme = useGameStore((state) => state.team1Theme);
  const team2Theme = useGameStore((state) => state.team2Theme);

  const throwToast = (isTeam1: boolean) => {
    toast({
      title: isTeam1
        ? team1Theme + " Team Buzzed"
        : team2Theme + " Team Buzzed",
      variant: isTeam1 ? team1Theme : team2Theme,
    });
  };

  useEffect(() => {
    if (lastTeam1Press > 0) {
      throwToast(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTeam1Press]);

  useEffect(() => {
    if (lastTeam2Press > 0) {
      throwToast(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTeam2Press]);

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
      {!currentGame && <GameListPage />}
      {currentGame && <GamePlayPage />}
      <Toaster />
      <DebugDialog />
    </>
  );
};

export default App;
