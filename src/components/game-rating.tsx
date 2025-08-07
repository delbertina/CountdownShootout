import { Rating, RatingButton } from "./ui/rating";

export interface GameRatingProps {
  score: number;
}

const GameRating = (props: GameRatingProps) => {
  return (
    <>
      {props.score === 1 && <GameRatingOne />}
      {props.score === 2 && <GameRatingTwo />}
      {props.score === 3 && <GameRatingThree />}
      {props.score === 4 && <GameRatingFour />}
      {props.score === 5 && <GameRatingFive />}
    </>
  );
};

const GameRatingOne = () => {
  return (
    <>
      <Rating value={1} readOnly>
        <RatingButton key={1} className="text-yellow-500 bg-transparent" />
        <RatingButton key={2} className="text-stone-300 bg-transparent" />
        <RatingButton key={3} className="text-stone-300 bg-transparent" />
        <RatingButton key={4} className="text-stone-300 bg-transparent" />
        <RatingButton key={5} className="text-stone-300 bg-transparent" />
      </Rating>
    </>
  );
};

const GameRatingTwo = () => {
  return (
    <>
      <Rating value={2} readOnly>
        <RatingButton key={1} className="text-yellow-500 bg-transparent" />
        <RatingButton key={2} className="text-yellow-500 bg-transparent" />
        <RatingButton key={3} className="text-stone-300 bg-transparent" />
        <RatingButton key={4} className="text-stone-300 bg-transparent" />
        <RatingButton key={5} className="text-stone-300 bg-transparent" />
      </Rating>
    </>
  );
}

const GameRatingThree = () => {
  return (
    <>
      <Rating value={3} readOnly>
        <RatingButton key={1} className="text-yellow-500 bg-transparent" />
        <RatingButton key={2} className="text-yellow-500 bg-transparent" />
        <RatingButton key={3} className="text-yellow-500 bg-transparent" />
        <RatingButton key={4} className="text-stone-300 bg-transparent" />
        <RatingButton key={5} className="text-stone-300 bg-transparent" />
      </Rating>
    </>
  );
}

const GameRatingFour = () => {
  return (
    <>
      <Rating value={4} readOnly>
        <RatingButton key={1} className="text-yellow-500 bg-transparent" />
        <RatingButton key={2} className="text-yellow-500 bg-transparent" />
        <RatingButton key={3} className="text-yellow-500 bg-transparent" />
        <RatingButton key={4} className="text-yellow-500 bg-transparent" />
        <RatingButton key={5} className="text-stone-300 bg-transparent" />
      </Rating>
    </>
  );
}

const GameRatingFive = () => {
  return (
    <>
      <Rating value={5} readOnly>
        <RatingButton key={1} className="text-yellow-500 bg-transparent" />
        <RatingButton key={2} className="text-yellow-500 bg-transparent" />
        <RatingButton key={3} className="text-yellow-500 bg-transparent" />
        <RatingButton key={4} className="text-yellow-500 bg-transparent" />
        <RatingButton key={5} className="text-yellow-500 bg-transparent" />
      </Rating>
    </>
  );
}

export default GameRating;
