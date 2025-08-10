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
    <div className="flex flex-row gap-4">
      <Rating value={1} readOnly>
        <RatingButton key={1} className="text-green-500 bg-transparent" />
        <RatingButton key={2} className="text-stone-300 bg-transparent" />
        <RatingButton key={3} className="text-stone-300 bg-transparent" />
        <RatingButton key={4} className="text-stone-300 bg-transparent" />
        <RatingButton key={5} className="text-stone-300 bg-transparent" />
      </Rating>
      <div className="text-green-500 font-bold">
        Easy
      </div>
    </div>
  );
};

const GameRatingTwo = () => {
  return (
    <div className="flex flex-row gap-4">
      <Rating value={2} readOnly>
        <RatingButton key={1} className="text-yellow-500 bg-transparent" />
        <RatingButton key={2} className="text-yellow-500 bg-transparent" />
        <RatingButton key={3} className="text-stone-300 bg-transparent" />
        <RatingButton key={4} className="text-stone-300 bg-transparent" />
        <RatingButton key={5} className="text-stone-300 bg-transparent" />
      </Rating>
      <div className="text-yellow-500 font-bold">
        Average
      </div>
    </div>
  );
}

const GameRatingThree = () => {
  return (
    <div className="flex flex-row gap-4">
      <Rating value={3} readOnly>
        <RatingButton key={1} className="text-red-500 bg-transparent" />
        <RatingButton key={2} className="text-red-500 bg-transparent" />
        <RatingButton key={3} className="text-red-500 bg-transparent" />
        <RatingButton key={4} className="text-stone-300 bg-transparent" />
        <RatingButton key={5} className="text-stone-300 bg-transparent" />
      </Rating>
      <div className="text-red-500 font-bold">
        Hard
      </div>
    </div>
  );
}

const GameRatingFour = () => {
  return (
    <div className="flex flex-row gap-4">
      <Rating value={4} readOnly>
        <RatingButton key={1} className="text-blue-500 bg-transparent" />
        <RatingButton key={2} className="text-blue-500 bg-transparent" />
        <RatingButton key={3} className="text-blue-500 bg-transparent" />
        <RatingButton key={4} className="text-blue-500 bg-transparent" />
        <RatingButton key={5} className="text-stone-300 bg-transparent" />
      </Rating>
      <div className="text-blue-500 font-bold">
        Nightmare
      </div>
    </div>
  );
}

const GameRatingFive = () => {
  return (
    <div className="flex flex-row gap-4">
      <Rating value={5} readOnly>
        <RatingButton key={1} className="text-fuchsia-500 bg-transparent" />
        <RatingButton key={2} className="text-fuchsia-500 bg-transparent" />
        <RatingButton key={3} className="text-fuchsia-500 bg-transparent" />
        <RatingButton key={4} className="text-fuchsia-500 bg-transparent" />
        <RatingButton key={5} className="text-fuchsia-500 bg-transparent" />
      </Rating>
      <div className="text-fuchsia-500 font-bold">
        Impossible
      </div>
    </div>
  );
}

export default GameRating;
