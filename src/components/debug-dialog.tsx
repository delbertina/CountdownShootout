import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ButtonData } from "../types/game_types";
import { useGameStore } from "../store/gameStore";

const DebugDialog = () => {
  const gameStage = useGameStore((state) => state.stage);
  const selectedButtonCol = useGameStore((state) => state.tempButtonCol);
  const selectedButtonRow = useGameStore((state) => state.tempButtonRow);
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
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            {ButtonData.map((buttonRow, i) => (
              <div key={i} className="flex flex-row gap-2 justify-between">
                {buttonRow.map((button, j) => (
                  <div key={j} className="flex-grow flex-shrink basis-0">
                    <button
                      className={
                        "w-full hover:border-transparent focus:outline-none focus:ring-0 " +
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
