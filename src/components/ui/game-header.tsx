import { useGameStore } from "../../store/gameStore";
import { useMemo } from "react";
import ShadedIndicator from "../shaded-indicator";
import { padNumber } from "../../lib/utils";
import { GameStage } from "../../types/game_types";

export interface GameHeaderProps {
  content: React.ReactNode;
}

const GameHeader = (props: GameHeaderProps) => {
  const currentGame = useGameStore((state) => state.currentGame);
  const gameStage = useGameStore((state) => state.stage);
  const questionId = useGameStore((state) => state.questionId);
  const gameQuestion = useGameStore(
    (state) => state.currentGame?.questions[state.questionId]
  );
  const teams = useGameStore((state) => state.teams);
  const isAnswering = useMemo(
    () => teams.some((team) => !!team.isAnswering),
    [teams]
  );
  const isSuddenDeath = useGameStore((state) => state.isSuddenDeath);
  return (
    <div className="flex flex-row h-full w-full gap-4 grow">
      <div className="flex flex-col gap-4">
        {teams
          .filter((_team, i) => i % 2 === 0)
          .map((team) => (
            <div className="flex flex-row gap-4">
              <ShadedIndicator
                text={"BUZZER"}
                theme={team.theme}
                isShaded={
                  // if the team can answer,
                  // nobody is answering currently,
                  // and it's either sudden death or the playing stage
                  team.canAnswer &&
                  !isAnswering &&
                  (isSuddenDeath || gameStage === GameStage.Playing)
                }
              />
              <div className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <h1>
                  {padNumber(
                    team.scoreHistory.reduce(
                      (sum, current) => sum + current,
                      0
                    ),
                    2
                  )}
                </h1>
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-col grow gap-4">
        <div className="flex flex-col justify-between overflow-hidden grow-0">
          <div className="font-bold text-xl truncate">
            <h2>{currentGame?.title ?? ""}</h2>
          </div>
          <div>
            <h2>{questionId + 1 + "/" + currentGame?.questions.length}</h2>
          </div>
          <div>
            <h2>{gameQuestion?.questionText}</h2>
          </div>
        </div>
        {/*  */}
        {/* Content here vvv */}
        {/*  */}
        {props.content}
        {/*  */}
        {/* Content here ^^^ */}
        {/*  */}
      </div>
      <div className="flex flex-col gap-4">
        {teams
          .filter((_team, i) => i % 2 === 1)
          .map((team) => (
            <div className="flex flex-row gap-4">
              <ShadedIndicator
                text={"BUZZER"}
                theme={team.theme}
                isShaded={
                  // if the team can answer,
                  // nobody is answering currently,
                  // and it's either sudden death or the playing stage
                  team.canAnswer &&
                  !isAnswering &&
                  (isSuddenDeath || gameStage === GameStage.Playing)
                }
              />
              <div className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <h1>
                  {padNumber(
                    team.scoreHistory.reduce(
                      (sum, current) => sum + current,
                      0
                    ),
                    2
                  )}
                </h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export { GameHeader };
