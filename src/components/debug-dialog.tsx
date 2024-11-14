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
        <div>
          {ButtonData.map((buttonRow, i) => (
            <div key={i}>
              {buttonRow.map((button, j) => (
                <button
                  key={j}
                  className={
                    selectedButtonCol === j && selectedButtonRow === i
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }
                >
                  {button}
                </button>
              ))}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DebugDialog;
