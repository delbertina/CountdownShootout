import { Plus, Swords } from "lucide-react";
import GameCard from "../components/game-card";
import { Button } from "../components/ui/button";
import { Games } from "../data/game_data";
import { useGameStore } from "../store/gameStore";

const GameListPage = () => {
  const selectQuiz = useGameStore((state) => state.selectQuiz);
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
          <Button>
            <Plus />
          </Button>
        </div>
      </div>
      <hr />
      <div className="flex flex-row flex-wrap justify-center content-start gap-4 flex-grow">
        {Games.map((game, i) => (
          <div key={i}>
            <GameCard
              title={game.title}
              description={game.description}
              selectQuiz={() => selectQuiz(game.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameListPage;
