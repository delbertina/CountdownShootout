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
import {
  NewGame,
  NewGameQuestion,
  NewGameQuestionOncore,
} from "../types/game_types";
import { GameDialog } from "../types/state_types";
import { useGameStore } from "../store/gameStore";
import { ChevronDown, ChevronUp, Copy, Trash } from "lucide-react";

const formSchema = z.object({
  game_title: z.string().min(1),
  description: z.string().min(1),
  info_timeout: z.coerce.number().min(1).max(30),
  answer_timeout: z.coerce.number().min(1).max(30),
  points_per_question: z.coerce.number().min(1).max(100),
  questions: z.array(
    z.object({
      text: z.string().min(1),
      video_src: z.string().min(1),
      video_start_time: z.coerce.number().min(0),
      video_end_time: z.coerce.number().min(0),
      answer: z.string().min(1),
      answer_subtext: z.string().min(1).optional(),
      oncore: z.array(
        z.object({
          answer_oncore_src: z.string().min(1).optional(),
          answer_oncore_start: z.coerce.number().min(0).optional(),
          answer_oncore_end: z.coerce.number().min(0).optional(),
        })
      ),
    })
  ),
});

const EditGameDialog = () => {
  const isDialogOpen = useGameStore(
    (state) => state.openDialog === GameDialog.EditGame
  );
  const openDialog = useGameStore((state) => state.presentDialog);
  const closeDialog = useGameStore((state) => state.closeDialog);
  const currentEditGame = useGameStore((state) => state.currentEditGame);
  const editGame = useGameStore((state) => state.editGame);
  const createGame = useGameStore((state) => state.createGame);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { watch, setValue } = form;
  const questions = watch("questions") as z.infer<
    typeof formSchema
  >["questions"];

  const addQuestion = (): void => {
    setValue("questions", [
      // ...questions,
      {
        text: NewGameQuestion.questionText,
        video_src: NewGameQuestion.questionVideo.youTubeID,
        video_start_time: NewGameQuestion.questionVideo.startTime,
        video_end_time: NewGameQuestion.questionVideo.endTime,
        answer: NewGameQuestion.answer,
        answer_subtext: NewGameQuestion.answerSubtext,
        oncore: [],
      },
    ]);
  };

  const removeQuestion = (index: number): void => {
    setValue(
      "questions",
      questions.filter((_question, i) => i !== index)
    );
  };

  const moveQuestionUp = (index: number): void => {
    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index - 1];
    newQuestions[index - 1] = temp;
    setValue("questions", newQuestions);
  };

  const moveQuestionDown = (index: number): void => {
    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index + 1];
    newQuestions[index + 1] = temp;
    setValue("questions", newQuestions);
  };

  const duplicateQuestion = (index: number): void => {
    const newQuestions = [...questions];
    newQuestions.splice(index + 1, 0, questions[index]);
    setValue("questions", newQuestions);
  };

  const addOncore = (index: number): void => {
    const newQuestions = [...questions];
    newQuestions[index].oncore = [
      {
        answer_oncore_src: NewGameQuestionOncore.youTubeID,
        answer_oncore_start: NewGameQuestionOncore.startTime,
        answer_oncore_end: NewGameQuestionOncore.endTime,
      },
    ];
    setValue("questions", newQuestions);
  };

  const removeOncore = (index: number): void => {
    const newQuestions = [...questions];
    newQuestions[index].oncore = [];
    setValue("questions", newQuestions);
  };

  const onSubmit = (values: z.infer<typeof formSchema>): void => {
    try {
      console.log(values);
      const gameValues = {
        id: currentEditGame.id,
        title: values.game_title,
        description: values.description,
        settings: {
          infoTimeout: values.info_timeout,
          answerTimeout: values.answer_timeout,
          pointsPerQuestion: values.points_per_question,
        },
        questions: values.questions.map((question) => ({
          questionText: question.text,
          questionVideo: {
            youTubeID: question.video_src ?? "",
            startTime: question.video_start_time,
            endTime: question.video_end_time,
          },
          answer: question.answer,
          answerSubtext: question.answer_subtext,
          // if no oncore, don't add
          answerEncore:
            question.oncore.length > 0
              ? {
                  youTubeID: question.oncore[0].answer_oncore_src ?? "",
                  startTime: question.oncore[0].answer_oncore_start ?? 0,
                  endTime: question.oncore[0].answer_oncore_end ?? 0,
                }
              : undefined,
        })),
      };
      console.log(gameValues);
      // if we're "editing" a new game, create it
      if (currentEditGame.id === NewGame.id) {
        createGame(gameValues);
      } else {
        // else just normal edit
        editGame(gameValues);
      }
      toast({ title: "Action Successful!" });
    } catch (error) {
      console.error("Form submission error", error);
      toast({ title: "Failed to submit the form. Please try again." });
    }
  };

  function handleClose(): void {
    closeDialog();
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        open ? openDialog(GameDialog.EditGame) : handleClose()
      }
    >
      <DialogContent className="sm:max-w-3xl flex flex-col h-screen">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle>Edit Game</DialogTitle>
            <DialogDescription>Edit the data of a game.</DialogDescription>
          </div>
          <Button onClick={handleClose}>X</Button>
        </DialogHeader>
        <div className="overflow-y-auto flex-1">
          <Form {...form}>
            <form
              id="edit-game-form"
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
                    <FormDescription>
                      The main name of the game.
                    </FormDescription>
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
              {watch("questions")?.map((_question, index) => (
                <div key={index} className="flex flex-col gap-8">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row flex-wrap gap-4">
                      <Button onClick={() => moveQuestionUp(index)}>
                        <ChevronUp />
                      </Button>
                      <Button onClick={() => moveQuestionDown(index)}>
                        <ChevronDown />
                      </Button>
                      <Button onClick={() => duplicateQuestion(index)}>
                        <Copy />
                      </Button>
                    </div>
                    <Button onClick={() => removeQuestion(index)} variant={"destructive"}>
                      <Trash />
                    </Button>
                  </div>
                  <div>
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
                              YouTube video ID for question
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
                              <Input
                                placeholder="15"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Timestamp to start playing (seconds)
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
                              <Input
                                placeholder="30"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Timestamp to stop playing (seconds)
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
                  <div className="flex flex-row gap-4">
                    <Button
                      disabled={questions[index].oncore.length > 0}
                      onClick={() => addOncore(index)}
                    >
                      Add Oncore
                    </Button>
                    <Button
                      disabled={questions[index].oncore.length === 0}
                      onClick={() => removeOncore(index)}
                      variant="destructive"
                    >
                      Remove Oncore
                    </Button>
                  </div>
                  {_question.oncore.map((_oncore, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-12 gap-4 align-middle"
                    >
                      <div className="col-span-4">
                        <FormField
                          control={form.control}
                          name={`questions.${index}.oncore.${i}.answer_oncore_src`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Answer Oncore Video</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="youtube.com/???"
                                  type="text"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Youtube video ID for oncore video
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-4">
                        <FormField
                          control={form.control}
                          name={`questions.${index}.oncore.${i}.answer_oncore_start`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Answer Oncore Start</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="15"
                                  type="number"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Timestamp to start playing (seconds)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-4">
                        <FormField
                          control={form.control}
                          name={`questions.${index}.oncore.${i}.answer_oncore_end`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Answer Oncore End</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="30"
                                  type="number"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Timestamp to stop playing (seconds)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </form>
          </Form>
        </div>
        <div className="flex flex-row justify-end gap-4">
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button form="edit-game-form" type="submit">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditGameDialog;
