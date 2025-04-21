import { useFieldArray, useForm } from "react-hook-form";
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
import { ChevronDown, ChevronUp, Copy, ExternalLink, Plus, Trash } from "lucide-react";
import { useEffect } from "react";
import { getYoutubeBoundedURL } from "../lib/utils";

const formSchema = z.object({
  game_title: z.string().min(1),
  description: z.string().min(1),
  info_timeout: z.coerce.number().min(1).max(30).optional(),
  answer_timeout: z.coerce.number().min(1).max(30).optional(),
  points_per_question: z.coerce.number().min(1).max(100).optional(),
  questions: z.array(
    z.object({
      text: z.string().min(1),
      video_src: z.string().min(11).max(11)
        .regex(new RegExp(/^[a-zA-Z0-9\-_]{11}/), { message: "Invalid YouTube ID. Can only contain A-Z, 0-9, - and _" }),
      video_start_time: z.coerce.number().min(0),
      video_end_time: z.coerce.number().min(0),
      answer: z.string().min(1),
      answer_subtext: z.string().min(1).optional().or(z.literal('')),
      has_oncore: z.boolean().default(false),
      answer_oncore_src: z.string().min(11).max(11)
        .regex(new RegExp(/^[a-zA-Z0-9\-_]{11}/), { message: "Invalid YouTube ID. Can only contain A-Z, 0-9, - and _" })
        .optional().or(z.literal('')),
      answer_oncore_start: z.coerce.number().min(0).optional(),
      answer_oncore_end: z.coerce.number().min(0).optional(),
    })
  ).min(1),
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
    mode: "onChange",
    resolver: zodResolver(formSchema), defaultValues: {
      game_title: currentEditGame.title,
      description: currentEditGame.description,
      info_timeout: currentEditGame.settings.infoTimeout,
      answer_timeout: currentEditGame.settings.answerTimeout,
      points_per_question: currentEditGame.settings.pointsPerQuestion,
      questions: currentEditGame.questions.map((question) => ({
        text: question.questionText,
        video_src: question.questionVideo.youTubeID,
        video_start_time: question.questionVideo.startTime,
        video_end_time: question.questionVideo.endTime,
        answer: question.answer,
        answer_subtext: question.answerSubtext,
        has_oncore: (question.answerEncore?.youTubeID ?? "") !== "",
        answer_oncore_src: question.answerEncore?.youTubeID ?? "",
        answer_oncore_start:
          question.answerEncore?.startTime ?? 0,
        answer_oncore_end:
          question.answerEncore?.endTime ?? 0,
      })),
    },
  });
  const { control, watch, setValue, reset, handleSubmit, formState: { errors, isDirty, isValid } } = form;
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "questions",
  });

  // Reset form values when currentEditGame changes
  useEffect(() => {
    if (currentEditGame) {
      reset({
        game_title: currentEditGame.title,
        description: currentEditGame.description,
        info_timeout: currentEditGame.settings.infoTimeout,
        answer_timeout: currentEditGame.settings.answerTimeout,
        points_per_question: currentEditGame.settings.pointsPerQuestion,
        questions: currentEditGame.questions.map((question) => ({
          text: question.questionText,
          video_src: question.questionVideo.youTubeID,
          video_start_time: question.questionVideo.startTime,
          video_end_time: question.questionVideo.endTime,
          answer: question.answer,
          answer_subtext: question.answerSubtext,
          has_oncore: (question.answerEncore?.youTubeID ?? "") !== "",
          answer_oncore_src: question.answerEncore?.youTubeID ?? "",
          answer_oncore_start: question.answerEncore?.startTime ?? 0,
          answer_oncore_end: question.answerEncore?.endTime ?? 0,
        })),
      });
    }
  }, [currentEditGame, reset]);

  const addQuestion = (): void => {
    append(
      {
        text: NewGameQuestion.questionText,
        video_src: NewGameQuestion.questionVideo.youTubeID,
        video_start_time: NewGameQuestion.questionVideo.startTime,
        video_end_time: NewGameQuestion.questionVideo.endTime,
        answer: NewGameQuestion.answer,
        answer_subtext: NewGameQuestion.answerSubtext,
        has_oncore: NewGameQuestionOncore.youTubeID !== "",
        answer_oncore_src: NewGameQuestionOncore.youTubeID,
        answer_oncore_start: NewGameQuestionOncore.startTime,
        answer_oncore_end: NewGameQuestionOncore.endTime,
      },
      { shouldFocus: true } // Focus on the new question after appending
    );
  };

  const removeQuestion = (index: number): void => {
    remove(index);
  };

  const moveQuestionUp = (index: number): void => {
    if (index > 0) move(index, index - 1);
  };

  const moveQuestionDown = (index: number): void => {
    if (index < fields.length - 1) move(index, index + 1);
  };

  const duplicateQuestion = (index: number): void => {
    const questionToDuplicate = fields[index]; // Get the question to duplicate
    append({
      ...questionToDuplicate, // Spread the existing question's values
    }, { shouldFocus: true }); // Append the duplicated question
  };

  const showOncore = (index: number): void => {
    setValue(`questions.${index}.has_oncore`, true);
    setValue(`questions.${index}.answer_oncore_src`, NewGameQuestionOncore.youTubeID);
    setValue(`questions.${index}.answer_oncore_start`, NewGameQuestionOncore.startTime);
    setValue(`questions.${index}.answer_oncore_end`, NewGameQuestionOncore.endTime);
  };

  const hideOncore = (index: number): void => {
    setValue(`questions.${index}.has_oncore`, false);
    setValue(`questions.${index}.answer_oncore_src`, undefined);
    setValue(`questions.${index}.answer_oncore_start`, undefined);
    setValue(`questions.${index}.answer_oncore_end`, undefined);
  };

  const openVideo = (videoSrc: string, startTime: number, endTime: number): void => {
    if (videoSrc && startTime > -1 && endTime > startTime) {
      window.open(getYoutubeBoundedURL(videoSrc, startTime, endTime), "_blank");
    } else {
      toast({ title: "Video source invalid." });
    }
  }

  const openQuestionVideo = (index: number): void => {
    const videoSrc = watch(`questions.${index}.video_src`);
    const startTime = watch(`questions.${index}.video_start_time`);
    const endTime = watch(`questions.${index}.video_end_time`);
    openVideo(videoSrc, startTime, endTime);
  };

  const openQuestionOncoreVideo = (index: number): void => {
    const videoSrc = watch(`questions.${index}.answer_oncore_src`) ?? '';
    const startTime = watch(`questions.${index}.answer_oncore_start`) ?? 0;
    const endTime = watch(`questions.${index}.answer_oncore_end`) ?? 0;
    openVideo(videoSrc, startTime, endTime);
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
          answerEncore:  question.has_oncore ? {
            youTubeID: question.answer_oncore_src ?? "",
            startTime: question.answer_oncore_start ?? 0,
            endTime: question.answer_oncore_end ?? 0,
          } : undefined,
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
      reset(); // Reset the form after submission
      closeDialog(); // Close the dialog after submission
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
      <DialogContent className="sm:max-w-3xl flex flex-col h-[90vh]">
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
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl mx-auto pb-10 px-2"
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
              <div className="flex flex-row justify-between items-center shadow-lg  rounded-md p-4 mb-4 sticky top-0 bg-slate-300 z-10">
                <h2 className="text-lg font-semibold">Questions ({fields.length})</h2>
                <Button onClick={addQuestion}><Plus /></Button>
              </div>
              {errors.questions && errors.questions?.type === "too_small"  &&  (<p className="text-red-500">Must contain at least 1 question.</p>)}
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-8 bg-slate-50">
                  <div className="flex flex-row justify-between bg-slate-200 p-2">
                    <div className="flex flex-row flex-wrap items-center gap-4">
                      <Button onClick={() => moveQuestionUp(index)}>
                        <ChevronUp />
                      </Button>
                      <Button onClick={() => moveQuestionDown(index)}>
                        <ChevronDown />
                      </Button>
                      <Button onClick={() => duplicateQuestion(index)}>
                        <Copy />
                      </Button>
                      <h3>Question #{index + 1}</h3>
                    </div>
                    <Button onClick={() => removeQuestion(index)} variant={"destructive"}>
                      <Trash />
                    </Button>
                  </div>
                  <div>
                    <FormField
                      control={control}
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
                    <div className="col-span-1">
                      <Button className="mt-8" disabled={watch(`questions.${index}.video_src`) === ""} onClick={() => openQuestionVideo(index)}><ExternalLink /> </Button>
                    </div>
                    <div className="col-span-5">
                      <FormField
                        control={control}
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
                    <div className="col-span-3">
                      <FormField
                        control={control}
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
                    <div className="col-span-3">
                      <FormField
                        control={control}
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
                        control={control}
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
                        control={control}
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
                  <div
                    className="grid grid-cols-12 gap-4 align-middle"
                  >
                    <div className="flex gap-4 col-span-1">
                      <FormField
                        control={control}
                        name={`questions.${index}.has_oncore`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Oncore?</FormLabel>
                            <FormControl>
                              <Input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  field.onChange(isChecked);
                                  if (isChecked) {
                                    showOncore(index);
                                  } else {
                                    hideOncore(index);
                                  }
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    {watch(`questions.${index}.has_oncore`) && (
                      <>
                        <div className="col-span-1">
                          <Button className="mt-8" disabled={watch(`questions.${index}.answer_oncore_src`) === ""} onClick={() => openQuestionOncoreVideo(index)}><ExternalLink /> </Button>
                        </div>
                        <div className="col-span-4">
                          <FormField
                            control={form.control}
                            name={`questions.${index}.answer_oncore_src`}
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
                        <div className="col-span-3">
                          <FormField
                            control={form.control}
                            name={`questions.${index}.answer_oncore_start`}
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
                        <div className="col-span-3">
                          <FormField
                            control={form.control}
                            name={`questions.${index}.answer_oncore_end`}
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
                      </>
                    )}
                  </div>
                </div>
              ))}
            </form>
          </Form>
        </div>
        <div className="flex flex-row justify-end gap-4">
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button form="edit-game-form" type="submit" disabled={!isDirty || !isValid}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditGameDialog;
