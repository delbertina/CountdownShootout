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
          <div className="flex flex-row gap-4 justify-between">
            <div>
            <Button><Plus /></Button>
            <Button><Import /></Button>
            </div>
            <div>
              <Button><X /></Button>
            </div>
          </div>
          <div>
            {Games.map((game, i) => (
              <div key={i} className="outline w-full flex flex-row gap-4 justify-between">
                <div>
                {game.title}
                </div>
                <div>
                  <Button><Edit /></Button>
                  <Button variant={"destructive"}><Delete /></Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ManageGamesDialog;
  