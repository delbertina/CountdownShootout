import { TeamTheme } from "../types/theme_types";
import ShadedIndicator from "./shaded-indicator";

export interface GameHeaderProps {
  leftIndicatorText: string;
  leftIndicatorTheme: TeamTheme;
  leftIndicatorIsShaded: boolean;
  leftIndicatorScore: number;
  rightIndicatorText: string;
  rightIndicatorTheme: TeamTheme;
  rightIndicatorIsShaded: boolean;
  rightIndicatorScore: number;
  headerTitle: string;
  headerSubtitle: string;
}

const GameHeader = (props: GameHeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center gap-4 w-full">
      <ShadedIndicator
        text={props.leftIndicatorText}
        theme={props.leftIndicatorTheme}
        isShaded={props.leftIndicatorIsShaded}
      />
      <div className="flex flex-row flex-grow items-center justify-between gap-4">
        <div className="text-red-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h1>{props.leftIndicatorScore}</h1>
        </div>
        <div className="flex-grow flex flex-col justify-between overflow-hidden">
          <div className="font-bold text-xl truncate">
            <h2>{props.headerTitle}</h2>
          </div>
          <div>
            <h2>
              {props.headerSubtitle}
            </h2>
          </div>
          <div></div>
        </div>
        <div className="text-blue-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h1>{props.rightIndicatorScore}</h1>
        </div>
      </div>
      <ShadedIndicator
        text={props.rightIndicatorText}
        theme={props.rightIndicatorTheme}
        isShaded={props.rightIndicatorIsShaded}
      />
    </div>
  );
};

export default GameHeader;
