import { Calendar, Info, Pin, Settings } from "lucide-react";
import { useGameStore } from "../store/gameStore";
import { GameDialog } from "../types/state_types";
import GameRating from "./game-rating";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Separator } from "./ui/separator";

const ViewGameDialog = () => {
  const isDialogOpen = useGameStore(
    (state) => state.openDialog === GameDialog.ViewGame
  );
  const openDialog = useGameStore((state) => state.presentDialog);
  const closeDialog = useGameStore((state) => state.closeDialog);
  const startQuiz = useGameStore((state) => state.startQuiz);
  const currentGame = useGameStore((state) => state.currentViewGame);
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        open ? openDialog(GameDialog.ViewGame) : closeDialog()
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currentGame.title}</DialogTitle>
          <DialogDescription>
            {currentGame.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Info />
              <div>{currentGame.questions.length}{" "}Question{currentGame.questions.length === 1 ? "" : "s"}</div>
            </div>
            <GameRating score={currentGame.rating} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Calendar />
              <div>Last Played:{" "}{"8/1/2025"}</div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Pin />
              <div>Special Instructions</div>
            </div>
            <div className="flex flex-row">
              - Must answer in the form of a question
            </div>
            <div className="flex flex-row">
              <Settings />
              <div>Settings</div>
            </div>
            <div className="flex flex-row">
              - Placeholder settings go here
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => startQuiz()}>Start</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ViewGameDialog;
