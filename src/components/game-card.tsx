import { Game } from "../types/game_types";
import GameRating from "./game-rating";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Separator } from "./ui/separator";

export interface GameCardProps {
  game: Game;
  selectQuiz: () => void;
}
const GameCard = (props: GameCardProps) => {
  return (
    <Card
      title={props.game.title}
      className="w-96 h-48 flex flex-col cursor-pointer"
      onClick={() => {
        props.selectQuiz();
      }}
    >
      <CardHeader>
        <CardTitle>{props.game.title}</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="text-left flex-grow -mt-4 justify-center">
        <GameRating
          value={props.game.rating}
          isReadOnly={true}
          onChange={() => {}}
        />
      </CardContent>
      <CardFooter className="font-light italic">
        {"Last Played: 1/1/2022"}
      </CardFooter>
    </Card>
  );
};

export default GameCard;
