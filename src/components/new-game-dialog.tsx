import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const NewGameDialog = () => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Game</DialogTitle>
          <DialogDescription>
            Create a new game to play with others.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewGameDialog;
