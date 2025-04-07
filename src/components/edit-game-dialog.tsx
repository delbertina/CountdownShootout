import { useForm } from "react-hook-form";
import { toast } from "../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { NewGameQuestion } from "../types/game_types";
import { GameDialog } from "../types/state_types";
import { useGameStore } from "../store/gameStore";

const formSchema = z.object({
  game_title: z.string().min(1),
  description: z.string().min(1),
  info_timeout: z.number().min(1).max(30),
  answer_timeout: z.number().min(1).max(30),
  points_per_question: z.number().min(1).max(100),
  questions: z.array(
    z.object({
      text: z.string().min(1),
      video_src: z.string().min(1),
      video_start_time: z.number().min(0),
      video_end_time: z.number().min(0),
      answer: z.string().min(1),
      answer_subtext: z.string().min(1).optional(),
      answer_oncore_src: z.string().min(1).optional(),
      answer_oncore_start: z.number().min(0).optional(),
      answer_oncore_end: z.number().min(0).optional(),
    })
  ),
});

const EditGameDialog = () => {
  const isDialogOpen = useGameStore(
    (state) => state.openDialog === GameDialog.EditGame
  );
  const openDialog = useGameStore((state) => state.presentDialog);
  const closeDialog = useGameStore((state) => state.closeDialog);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { watch, setValue } = form;
  const questions = watch("questions");

  const addQuestion = () => {
    setValue("questions", [
      ...questions,
      {
        text: NewGameQuestion.questionText,
        video_src: NewGameQuestion.questionVideo.youTubeID,
        video_start_time: NewGameQuestion.questionVideo.startTime,
        video_end_time: NewGameQuestion.questionVideo.endTime,
        answer: NewGameQuestion.answer,
        answer_subtext: NewGameQuestion.answerSubtext,
        answer_oncore_src: NewGameQuestion.answerEncore?.youTubeID ?? "",
        answer_oncore_start: NewGameQuestion.answerEncore?.startTime ?? 0,
        answer_oncore_end: NewGameQuestion.answerEncore?.endTime ?? 0,
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setValue(
      "questions",
      questions.filter((_question, i) => i !== index)
    );
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast({ title: "Failed to submit the form. Please try again." });
    }
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        open ? openDialog(GameDialog.EditGame) : closeDialog()
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Game</DialogTitle>
          <DialogDescription>Edit the data of a game.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <FormField
              control={form.control}
              name="game_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="New Game" type="text" {...field} />
                  </FormControl>
                  <FormDescription>The main name of the game.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New game description"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Any extra info about the game not included in the title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="info_timeout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Info Timeout</FormLabel>
                      <FormControl>
                        <Input placeholder="15" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        How long the info stage should be visable before
                        advancing
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="answer_timeout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer Timeout</FormLabel>
                      <FormControl>
                        <Input placeholder="15" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        How long teams get to answer
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="points_per_question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Points Per Question</FormLabel>
                  <FormControl>
                    <Input placeholder="1" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Max points each question is worth
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-between">
              <h2 className="text-lg font-semibold">Questions</h2>
              <Button onClick={addQuestion}>Add Question</Button>
            </div>
            {form.watch("questions").map((_question, index) => (
              <>
                <div className="flex flex-row justify-between">
                  <Button onClick={() => removeQuestion(index)}>Remove</Button>
                  <FormField
                    control={form.control}
                    name={`questions.${index}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Text</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Question #1"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Hint text for the question
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name={`questions.${index}.video_src`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question Video</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="youtube.com/???"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Link to the YouTube for the question
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name={`questions.${index}.video_start_time`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input placeholder="15" type="number" {...field} />
                          </FormControl>
                          <FormDescription>
                            Timestamp that the video should start playing in
                            seconds
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name={`questions.${index}.video_end_time`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input placeholder="30" type="number" {...field} />
                          </FormControl>
                          <FormDescription>
                            Timestamp that the video should end in seconds
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name={`questions.${index}.answer`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Answer</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Question #1 Answer"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The answer to the question
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name={`questions.${index}.answer_subtext`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Answer Subtext</FormLabel>
                          <FormControl>
                            <Input placeholder="" type="text" {...field} />
                          </FormControl>
                          <FormDescription>
                            Subtext for answer to the question
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name={`questions.${index}.answer_oncore_src`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Answer Oncore Video</FormLabel>
                          <FormControl>
                            <Input placeholder="" type="text" {...field} />
                          </FormControl>
                          <FormDescription>
                            Youtube video URL for oncore video
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name={`questions.${index}.answer_oncore_start`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Answer Oncore Start</FormLabel>
                          <FormControl>
                            <Input placeholder="15" type="number" {...field} />
                          </FormControl>
                          <FormDescription>
                            Timestamp that the oncore video starts in seconds
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name={`questions.${index}.answer_oncore_end`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Answer Oncore End</FormLabel>
                          <FormControl>
                            <Input placeholder="30" type="number" {...field} />
                          </FormControl>
                          <FormDescription>
                            Time that the oncore video ends in seconds
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </>
            ))}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditGameDialog;
