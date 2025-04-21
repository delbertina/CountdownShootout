import { Delete, Edit, Import, Plus, X } from "lucide-react";
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
import { Game, NewGame } from "../types/game_types";

const ManageGamesDialog = () => {
  const isDialogOpen = useGameStore(
    (state) => state.openDialog === GameDialog.ManageGames
  );
  const openDialog = useGameStore((state) => state.presentDialog);
  const closeDialog = useGameStore((state) => state.closeDialog);
  const setCurrentEditGame = useGameStore((state) => state.setCurrentEditGame);
  const deleteGame = useGameStore((state) => state.deleteGame);
  const allGames = useGameStore((state) => state.allGames);

  const addNewGame = () => {
    setCurrentEditGame({ ...NewGame });
    openDialog(GameDialog.EditGame);
  };

  const startEditGame = (game: Game) => {
    if (game) {
      setCurrentEditGame({ ...game });
      openDialog(GameDialog.EditGame);
    }
  };

  const startDeleteGame = (gameId: number) => {
    // display a dialog to confirm deletion
    const result = window.confirm("Are you sure you want to delete this game?");
    // if confirmed, delete the game
    if (result) {
      deleteGame(gameId);
    }
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
            <Button onClick={() => addNewGame()}>
              <Plus />
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
          {allGames.map((game, i) => (
            <div
              key={i}
              className="outline w-full flex flex-row gap-4 justify-between"
            >
              <div>{game.title}</div>
              <div>
                <Button onClick={() => startEditGame(game)}>
                  <Edit />
                </Button>
                <Button variant={"destructive"} onClick={() => startDeleteGame(game.id)}>
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
