import {
  FileInput,
  FileOutput,
  HardDriveDownload,
  HardDriveUpload,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useGameStore } from "../store/gameStore";
import { GameDialog } from "../types/state_types";
import { Button } from "./ui/button";
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
            Bulk manage games. Import, export, reset, etc.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex flex-row gap-4">
            <Button>
              <FileInput />
              Import from File
            </Button>
            <Button>
              <FileOutput />
              Export to File
            </Button>
          </div>
          <div className="flex flex-row gap-4">
            <Button>
              <RotateCcw />
              Reset to Default
            </Button>
            <Button>
              <Trash2 />
              Reset to Empty
            </Button>
          </div>
          <div className="flex flex-row gap-4">
            <Button>
              <HardDriveUpload />
              Load from Local Storage Key
            </Button>
            <Button>
              <HardDriveDownload />
              Save to Local Storage Key
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportGamesDialog;
