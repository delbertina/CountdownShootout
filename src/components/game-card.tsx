import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Rating, RatingButton } from "./ui/rating";

export interface GameCardProps {
  title: string;
  description: string;
  selectQuiz: () => void;
}
const GameCard = (props: GameCardProps) => {
  return (
    <Card
      title={props.title}
      className="w-96 h-48 flex flex-col"
      onClick={() => {
        props.selectQuiz();
      }}
    >
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-left flex-grow">
        <Rating value={3} readOnly >
          <RatingButton key={1} className="text-yellow-500 bg-transparent" />
          <RatingButton key={2} className="text-yellow-500 bg-transparent" />
          <RatingButton key={3} className="text-yellow-500 bg-transparent" />
          <RatingButton key={4} className="text-yellow-500 bg-transparent" />
          <RatingButton key={5} className="text-yellow-500 bg-transparent" />
        </Rating>
        <div>
        {props.description}
        </div>
      </CardContent>
      <CardFooter className="font-light italic">
        {"Last Played: 1/1/2022"}
      </CardFooter>
    </Card>
  );
}

export default GameCard;
