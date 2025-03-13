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

const formSchema = z.object({
  game_title: z.string().min(1),
  description: z.string().min(1),
  info_timeout: z.number().min(1).max(30),
  answer_timeout: z.number().min(1).max(30),
  points_per_question: z.number().min(1).max(100),
  question_text_1: z.string().min(1),
  question_video_src: z.string().min(1),
  question_video_start_time_1: z.number().min(0),
  question_video_end_time_1: z.number().min(0),
  question_answer_1: z.string().min(1),
  question_answer_subtext_1: z.string().min(1).optional(),
  question_answer_oncore_src_1: z.string().min(1).optional(),
  question_answer_oncore_start_1: z.number().min(0).optional(),
  question_answer_oncore_end_1: z.number().min(0).optional(),
});

const EditGameDialog = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

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
            <FormField
              control={form.control}
              name="question_text_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Question #1" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Hint text for the question</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="question_video_src"
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
                  name="question_video_start_time_1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input placeholder="15" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Timestamp that the video should start playing in seconds
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="question_video_end_time_1"
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
                  name="question_answer_1"
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
                  name="question_answer_subtext_1"
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
                  name="question_answer_oncore_src_1"
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
                  name="question_answer_oncore_start_1"
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
                  name="question_answer_oncore_end_1"
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditGameDialog;
