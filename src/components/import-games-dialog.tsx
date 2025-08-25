import { useGameStore } from "../store/gameStore";
import { GameDialog } from "../types/state_types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const ImportGamesDialog = () => {
  const isDialogOpen = useGameStore(
    (state) => state.openDialog === GameDialog.ImportGames
  );
  const openDialog = useGameStore((state) => state.presentDialog);
  const closeDialog = useGameStore((state) => state.closeDialog);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        open ? openDialog(GameDialog.ImportGames) : closeDialog()
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Games</DialogTitle>
          <DialogDescription>
            Add games from a JSON file exported from another instance or from local storage.
          </DialogDescription>
        </DialogHeader>
        <div>Body</div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportGamesDialog;
