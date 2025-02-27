import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ButtonData } from "../types/game_types";
import { useGameStore } from "../store/gameStore";
import { useMemo } from "react";
import { dummyTeamState, getTeamDisplayName } from "../types/state_types";

const DebugDialog = () => {
  const gameStage = useGameStore((state) => state.stage);
  const currentQuestion = useGameStore((state) => state.questionId);
  const currentGame = useGameStore((state) => state.currentGame);
  const selectedButtonCol = useGameStore((state) => state.debugButtonCol);
  const selectedButtonRow = useGameStore((state) => state.debugButtonRow);
  const selectedTeam = useGameStore((state) => state.debugTeamSelector);
  const teams = useGameStore((state) => state.teams);
  const teamsScoreHistory = useMemo(
    () => teams.map((team) => team.scoreHistory),
    [teams]
  );
  const isDebugOpen = useGameStore((state) => state.isDebugOpen);
  const toggleDebugDialog = useGameStore((state) => state.toggleDebugDialog);

  return (
    <Dialog open={isDebugOpen} onOpenChange={toggleDebugDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Debug</DialogTitle>
          <DialogDescription>
            See and change the state of the game.
          </DialogDescription>
        </DialogHeader>
        <div>Stage: "{gameStage}"</div>
        <div>
          Current Question: {currentQuestion} /{" "}
          {currentGame?.questions.length ?? "No Game Selected"}
        </div>
        {teamsScoreHistory.map((scoreHistory, i) => (
          <div className={selectedTeam === i ? "bg-red-300" : ""} key={i}>
            {getTeamDisplayName(
              teams.find((team) => team.id === i) ?? dummyTeamState
            )}{" "}
            Score History: {JSON.stringify(scoreHistory)}
          </div>
        ))}
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            {ButtonData.map((buttonRow, i) => (
              <div key={i} className="flex flex-row gap-2 justify-between">
                {buttonRow.map((button, j) => (
                  <div key={j} className="flex-grow flex-shrink basis-0">
                    <button
                      className={
                        "w-full h-full hover:border-transparent focus:outline-none focus:ring-0 " +
                        (selectedButtonCol === j && selectedButtonRow === i
                          ? "bg-red-500"
                          : "bg-blue-500")
                      }
                    >
                      {button}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DebugDialog;
