import { Settings, Swords } from "lucide-react";
import GameCard from "../components/game-card";
import { Button } from "../components/ui/button";
import { useGameStore } from "../store/gameStore";
import { GameDialog } from "../types/state_types";

const GameListPage = () => {
  const selectQuiz = useGameStore((state) => state.selectQuiz);
  const openDialog = useGameStore((state) => state.presentDialog);
  const allGames = useGameStore((state) => state.allGames);
  return (
    <div className="card-page whole-screen flex flex-col bg-slate-700 text-amber-200 gap-4">
      <div className="flex flex-row items-center justify-center gap-4">
        <div>
          <Button disabled>
            <Swords />
          </Button>
        </div>
        <h1 className="font-bold flex-grow-0">Game List</h1>
        <div>
          <Button onClick={() => openDialog(GameDialog.ManageGames)}>
            <Settings />
          </Button>
        </div>
      </div>
      <hr />
      <div className="flex flex-row flex-wrap justify-center content-start gap-4 flex-grow">
        {allGames.map((game, i) => (
          <div key={i}>
            <GameCard
              game={game}
              selectQuiz={() => selectQuiz(game.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameListPage;
