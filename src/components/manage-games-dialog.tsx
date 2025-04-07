import { Delete, Edit, Import, Plus, X } from "lucide-react";
import { Games } from "../data/game_data";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useGameStore } from "../store/gameStore";
import { GameDialog } from "../types/state_types";
import { NewGame } from "../types/game_types";

const ManageGamesDialog = () => {
  const isDialogOpen = useGameStore(
    (state) => state.openDialog === GameDialog.ManageGames
  );
  const openDialog = useGameStore((state) => state.presentDialog);
  const closeDialog = useGameStore((state) => state.closeDialog);
  const setCurrentEditGame = useGameStore((state) => state.setCurrentEditGame);

  const addNewGame = () => {
    setCurrentEditGame({ ...NewGame });
    openDialog(GameDialog.EditGame);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        open ? openDialog(GameDialog.ManageGames) : closeDialog()
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Games</DialogTitle>
          <DialogDescription>
            Create, update, import, and delete games.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-4 justify-between">
          <div>
            <Button>
              <Plus onClick={() => addNewGame()} />
            </Button>
            <Button disabled>
              <Import />
            </Button>
          </div>
          <div>
            <Button disabled>
              <X />
            </Button>
          </div>
        </div>
        <div>
          {Games.map((game, i) => (
            <div
              key={i}
              className="outline w-full flex flex-row gap-4 justify-between"
            >
              <div>{game.title}</div>
              <div>
                <Button>
                  <Edit />
                </Button>
                <Button variant={"destructive"}>
                  <Delete />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageGamesDialog;
