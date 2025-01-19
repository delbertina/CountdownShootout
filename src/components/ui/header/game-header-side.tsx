import { padNumber } from "../../../lib/utils";
import { GameStage } from "../../../types/game_types";
import { TeamState } from "../../../types/state_types";
import ShadedIndicator from "../../shaded-indicator";

export interface GameHeaderSideProps {
  isLeft: boolean;
  teams: TeamState[];
  isAnswering: boolean;
  isSuddenDeath: boolean;
  gameStage: GameStage;
}
function GameHeaderSide(props: GameHeaderSideProps) {
  return (
    <div className="flex flex-col gap-4">
      {props.teams.map((team) => (
        <div className="flex flex-row gap-4">
          {!props.isLeft && (
            <h1>
              {padNumber(
                team.scoreHistory.reduce((sum, current) => sum + current, 0),
                2
              )}
            </h1>
          )}
          <ShadedIndicator
            text={"BUZZER"}
            theme={team.theme}
            isShaded={
              // if the team can answer,
              // nobody is answering currently,
              // and it's either sudden death or the playing stage
              team.canAnswer &&
              !props.isAnswering &&
              (props.isSuddenDeath || props.gameStage === GameStage.Playing)
            }
          />
          <div className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {props.isLeft && (
              <h1>
                {padNumber(
                  team.scoreHistory.reduce((sum, current) => sum + current, 0),
                  2
                )}
              </h1>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameHeaderSide;
