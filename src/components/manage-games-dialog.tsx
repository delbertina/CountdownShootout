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
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ManageGamesDialog;
  