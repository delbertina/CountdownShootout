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
import { Game, isGameValid } from "../types/game_types";

const ImportGamesDialog = () => {
  const isDialogOpen = useGameStore(
    (state) => state.openDialog === GameDialog.ImportGames
  );
  const openDialog = useGameStore((state) => state.presentDialog);
  const closeDialog = useGameStore((state) => state.closeDialog);
  const games = useGameStore((state) => state.allGames);

  const handleImportFromFile = () => {
    // prompt user to select a file
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    // read file as text
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const json = JSON.parse(e.target.result);
        // validate json and count games to be imported
        let validGames: Game[] = [];
        let invalidGames: number = 0;
        for (const game of json) {
          if (isGameValid(game)) {
            validGames.push(game);
          } else {
            invalidGames += 1;
          }
        }
        // if no valid games, alert user and return
        if (validGames.length === 0) {
          alert("No valid games to import.");
          return;
        }
        // prompt user to confirm import
        const result = window.confirm(
          `Import ${validGames.length} valid games. ${invalidGames} invalid games will be skipped.`
        );
        // if result is true, import games
        if (result) {
          // import games
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  const handleExportToFile = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(games, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "games.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

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
          <div className="flex flex-row justify-center gap-4">
            <Button size={"card"} className="flex-1" onClick={handleImportFromFile}>
              <FileInput />
              Import from File
            </Button>
            <Button size={"card"} className="flex-1" onClick={handleExportToFile}>
              <FileOutput />
              Export to File
            </Button>
          </div>
          <div className="flex flex-row justify-center gap-4">
            <Button size={"card"} className="flex-1">
              <RotateCcw />
              Reset to Default
            </Button>
            <Button size={"card"} className="flex-1">
              <Trash2 />
              Reset to Empty
            </Button>
          </div>
          <div className="flex flex-row justify-center gap-4">
            <Button size={"card"} className="flex-1">
              <HardDriveUpload />
              Load from Local Storage Key
            </Button>
            <Button size={"card"} className="flex-1">
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
