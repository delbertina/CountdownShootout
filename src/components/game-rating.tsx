import { useEffect, useState } from "react";
import { Rating, RatingButton } from "./ui/rating";

export interface GameRatingProps {
  value: number;
  isReadOnly: boolean;
  onChange: (value: number) => void;
}

const ratingColors: string[] = [
  "text-green-500", // 1
  "text-yellow-500", // 2
  "text-red-500", // 3
  "text-blue-500", // 4
  "text-fuchsia-500", // 5
];

const ratingLabels: JSX.Element[] = [
  <div className="text-green-500 font-bold">Easy</div>,
  <div className="text-yellow-500 font-bold">Average</div>,
  <div className="text-red-500 font-bold">Hard</div>,
  <div className="text-blue-500 font-bold">Nightmare</div>,
  <div className="text-fuchsia-500 font-bold">Impossible</div>,
];

const GameRating = (props: GameRatingProps) => {
  const [value, setValue] = useState(props.value);

  const handleRatingChange = (newValue: number) => {
    setValue(newValue);
    props.onChange(newValue);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div className="flex flex-row gap-4">
      <Rating
        value={value}
        readOnly={props.isReadOnly}
        onValueChange={(e) => {
          handleRatingChange(e);
        }}
      >
        {[...Array(5)].map((_, i) => (
          <RatingButton
            key={i + 1}
            className={
              i < value
                ? ratingColors[value - 1] + " bg-transparent"
                : "text-stone-300 bg-transparent"
            }
          />
        ))}
      </Rating>
      {ratingLabels[value - 1]}
    </div>
  );
};

export default GameRating;
