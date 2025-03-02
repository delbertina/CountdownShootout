import { Games } from "../data/game_data";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "./ui/dialog";
  
  const ManageGamesDialog = () => {
    return (
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Games</DialogTitle>
            <DialogDescription>
              Create, update, import, and delete games.
            </DialogDescription>
          </DialogHeader>
          <div>
            {Games.map((game, i) => (
              <div key={i} className="outline">
                {game.title}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ManageGamesDialog;
  