import { useGameStore } from "../store/gameStore";
import { GameStage } from "../types/game_types";
import ShadedIndicator from "./shaded-indicator";

export interface GameHeaderProps {
  indicatorText: string;
  headerTitle: string;
  headerSubtitle: string;
}

const GameHeader = (props: GameHeaderProps) => {
  const gameStage = useGameStore((state) => state.stage);
  const teams = useGameStore((state) => state.teams);
  const canAnswer = useGameStore((state) => state.teams.filter((team) => !!team.canAnswer).map((team) => team.id));
  const isAnswering = useGameStore((state) => state.teams.filter((team) => !!team.isAnswering).map((team) => team.id));
  const isSuddenDeath = useGameStore((state) => state.isSuddenDeath);

  return (
    <div className="flex flex-row justify-between items-center gap-4 w-full">
      <div className="flex flex-col gap-4">
      {teams.filter((_team, i) => i % 2 === 0).map((team) => (
        <div className="flex flex-row gap-4">
        <ShadedIndicator
        text={props.indicatorText}
        theme={team.theme}
        isShaded={canAnswer.includes(team.id)  &&
                  (isAnswering.length === 0) && (isSuddenDeath ||
                    gameStage === GameStage.Playing)}
        />
        <div className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h1>{team.scoreHistory.reduce((sum, current) => sum + current, 0)}</h1>
        </div>
        </div>
      ))}
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
      </div>
      <div>
      {teams.filter((_team, i) => i % 2 === 1).map((team) => (
        <>
        <div className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h1>{team.scoreHistory.reduce((sum, current) => sum + current, 0)}</h1>
        </div>
        <ShadedIndicator
        text={props.indicatorText}
        theme={team.theme}
        isShaded={canAnswer.includes(team.id)  &&
                  (isAnswering.length === 0) && (isSuddenDeath ||
                    gameStage === GameStage.Playing)}
        />
        </>
      ))}
      </div>
    </div>
  );
};

export default GameHeader;
