import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const EditGameDialog = () => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Game</DialogTitle>
          <DialogDescription>Edit the data of a game.</DialogDescription>
        </DialogHeader>
        <div>{/* Title */}</div>
        <div>{/* Description */}</div>
        <div>{/* Game Settings */}</div>
        <div>
          {/* Question List Header */}
          {/* Add Question Button */}
        </div>
        <div>
          {/* Questions List */}
          <div>{/* Question Text */}</div>
          <div>{/* Question Video */}</div>
          <div>{/* Question Answer */}</div>
          <div>{/* Question Answer Subtext */}</div>
          <div>{/* Question Oncore */}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditGameDialog;
