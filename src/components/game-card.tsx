import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

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
        {props.description}
      </CardContent>
      <CardFooter className="font-light italic">
        {"Last Played: 1/1/2022"}
      </CardFooter>
    </Card>
  );
}

export default GameCard;
