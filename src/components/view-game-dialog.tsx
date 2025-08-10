import { Calendar, Info, Pin, Settings } from "lucide-react";
import { useGameStore } from "../store/gameStore";
import { GameDialog } from "../types/state_types";
import GameRating from "./game-rating";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
      <DialogContent className="sm:max-w-2xl flex flex-col h-[60vh] gap-8">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-4xl">{currentGame.title}</DialogTitle>
            <DialogDescription className="text-lg">{currentGame.description}</DialogDescription>
          </div>
          <Button className="mt-0" onClick={closeDialog}>X</Button>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col gap-4 flex-grow">
            <div className="flex flex-row gap-2">
              <Info />
              <div>
                {currentGame.questions.length} Question
                {currentGame.questions.length === 1 ? "" : "s"}
              </div>
            </div>
            <GameRating score={currentGame.rating} />
          </div>
          <div className="flex flex-col gap-4 flex-grow">
            <div className="flex flex-row gap-2">
              <Calendar />
              <div>Last Played: {"8/1/2025"}</div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-row flex-grow">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2">
                <Pin />
                <div>Special Instructions</div>
              </div>
              <div className="flex flex-row pl-4">
                - Must answer in the form of a question
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2">
                <Settings />
                <div>Settings</div>
              </div>
              <div className="flex flex-row pl-4">
                - Placeholder settings go here
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <Button onClick={() => startQuiz()}>Start</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ViewGameDialog;
