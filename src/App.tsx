import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useGameStore } from "./store/gameStore";
import ReactPlayer from "react-player";
import { GameStage } from "./types/game_types";
import { Games } from "./data/game_data";
import {
  Card,
  CardContent,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import { OnProgressProps } from "react-player/base";
import { Progress } from "./components/ui/progress";
import DebugDialog from "./components/debug-dialog";

const App = () => {
  const gameStage = useGameStore((state) => state.stage);
  const currentGame = useGameStore((state) => state.currentGame);
  const questionId = useGameStore((state) => state.questionId);
  const gameQuestion = useGameStore(
    (state) => state.currentGame?.questions[state.questionId]
  );
  const gamepadButtonPress = useGameStore((state) => state.gamepadButtonPress);
  const isPaused = useGameStore((state) => state.isPaused);
  const updateLastVideoTime = useGameStore(
    (state) => state.updateLastVideoTime
  );
  const lastVideoTime = useGameStore((state) => state.lastVideoTime);
  const { toast } = useToast();
  const lastTeam1Press = useGameStore((state) => state.lastTeam1Press);
  const lastTeam2Press = useGameStore((state) => state.lastTeam2Press);
  const isTeam1Answering = useGameStore((state) => state.isTeam1Answering);
  const isTeam2Answering = useGameStore((state) => state.isTeam2Answering);
  const canTeam1Answer = useGameStore((state) => state.canTeam1Answer);
  const canTeam2Answer = useGameStore((state) => state.canTeam2Answer);
  const team1ScoreHistory = useGameStore((state) =>
    state.team1ScoreHistory.reduce((sum, current) => sum + current, 0)
  );
  const team2ScoreHistory = useGameStore((state) =>
    state.team2ScoreHistory.reduce((sum, current) => sum + current, 0)
  );
  const isSuddenDeath = useGameStore((state) => state.isSuddenDeath);
  const selectQuiz = useGameStore((state) => state.selectQuiz);
  const startSuddenDeath = useGameStore((state) => state.startSuddenDeath);
  const [videoProgress, setVideoProgress] = useState(0);

  const throwToast = (isRed: boolean) => {
    toast({
      title: isRed ? "Red Team Buzzed" : "Blue Team Buzzed",
      variant: isRed ? "red" : "blue",
    });
  };

  useEffect(() => {
    console.log("Toast thrown");
    if (lastTeam1Press > 0) {
      throwToast(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTeam1Press]);

  useEffect(() => {
    console.log("Toast thrown");
    if (lastTeam2Press > 0) {
      throwToast(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTeam2Press]);

  // Only run the effect once - React 18 dev mode bug that they don't think is a bug
  const effectRan = useRef(false);
  useEffect(() => {
    if (!effectRan.current) {
      // @ts-expect-error (Firefox experimental event)
      window.addEventListener(
        "gamepadbuttondown",
        (evt: { gamepad: Gamepad; button: number }) => {
          callPadMove(evt);
        }
      );
      console.log("Listening for gamepad button presses...");
    }
    return () => {
      effectRan.current = true;
    };
    //
    // empty array to only run on first render
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callPadMove = (e: { gamepad: Gamepad; button: number }): void => {
    gamepadButtonPress(e);
  };

  const handleVideoProgress = (e: OnProgressProps): void => {
    if (isNaN(e.playedSeconds) || !gameQuestion) return;
    console.log(e, lastVideoTime);
    setVideoProgress(
      ((e.playedSeconds - gameQuestion.videoStartTime) /
        (gameQuestion.videoEndTime - gameQuestion.videoStartTime)) *
        100
    );
    updateLastVideoTime(e.playedSeconds);
  };

  const handleVideoEnd = (): void => {
    setVideoProgress(0);
    startSuddenDeath();
  };

  return (
    <>
      <div className="welcome-screen whole-screen flex flex-col justify-center bg-slate-200">
        <h1 className="font-bold">Welcome to Countdown Shootout</h1>
        <h2>This game currently requires 3 controllers to play.</h2>
      </div>
      <div className="card-page whole-screen flex flex-col bg-slate-700 text-amber-200 gap-8">
        {!currentGame && (
          <>
            <h2 className="font-bold flex-grow-0">Question Sets</h2>
            <div className="flex flex-row flex-wrap justify-center content-start gap-4 flex-grow">
              {Games.map((game, i) => (
                <div key={i}>
                  <Card
                    title={game.title}
                    className="w-96 h-48"
                    onClick={() => {
                      console.log("Game Selected", game);
                      selectQuiz(game.id);
                    }}
                  >
                    <CardHeader>
                      <CardTitle>{game.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-left">
                      {game.description}
                    </CardContent>
                    {/* <CardFooter className="font-light italic">
                      {"Last Played: 1/1/2022"}
                    </CardFooter> */}
                  </Card>
                </div>
              ))}
            </div>
          </>
        )}
        {currentGame && (
          <>
            <div className="flex flex-row justify-between items-center gap-4">
              <div
                className={
                  "flex-grow-0 flex-shrink-0 p-6 border-4 rounded-3xl font-bold text-2xl " +
                  (canTeam1Answer &&
                  ((isSuddenDeath && !isTeam1Answering && !isTeam2Answering) ||
                    (gameStage === GameStage.Playing &&
                      !isTeam1Answering &&
                      !isTeam2Answering))
                    ? "border-red-800 bg-red-500 text-white"
                    : "border-red-400 bg-red-300 text-white")
                }
              >
                BUZZER
              </div>
              <div className="flex-grow flex flex-col justify-between overflow-hidden">
                <div className="font-bold text-xl truncate">
                  {currentGame.title}
                </div>
                <div>
                  {questionId + 1}/{currentGame.questions.length}
                </div>
              </div>
              <div
                className={
                  "flex-grow-0 flex-shrink-0 p-6 border-4 rounded-3xl font-bold text-2xl " +
                  (canTeam2Answer &&
                  ((isSuddenDeath && !isTeam1Answering && !isTeam2Answering) ||
                    (gameStage === GameStage.Playing &&
                      !isTeam1Answering &&
                      !isTeam2Answering))
                    ? "border-blue-800 bg-blue-600 text-white"
                    : "border-blue-400 bg-blue-300 text-white")
                }
              >
                BUZZER
              </div>
            </div>
            {gameQuestion && (
              <>
                {gameStage === GameStage.Waiting && (
                  <div>
                    <h1>{gameQuestion.questionText}</h1>
                    <h2>
                      {gameQuestion.videoEndTime - gameQuestion.videoStartTime}{" "}
                      seconds
                    </h2>
                    {/* timer for remaining time before question starts */}
                  </div>
                )}
                {gameStage === GameStage.Playing && (
                  <div className="flex flex-col items-center gap-4 flex-grow h-full">
                    <h2>{gameQuestion.questionText}</h2>
                    <div className="flex-grow flex flex-row justify-center w-full">
                      <ReactPlayer
                        playing={!isPaused}
                        controls={false}
                        progressInterval={500}
                        onEnded={() => handleVideoEnd()}
                        onProgress={(e: OnProgressProps) =>
                          handleVideoProgress(e)
                        }
                        className="react-player"
                        width="80%"
                        url={
                          "https://www.youtube.com/watch?v=" +
                          gameQuestion.videoYouTubeID
                        }
                        config={{
                          youtube: {
                            playerVars: {
                              // start and end need a whole number
                              start: !lastVideoTime
                                ? Math.floor(gameQuestion.videoStartTime)
                                : Math.floor(lastVideoTime),
                              end: Math.floor(gameQuestion.videoEndTime),
                              rel: 0,
                            },
                          },
                        }}
                      ></ReactPlayer>
                    </div>
                    {/* timer for remaining time in video */}
                    <div className="flex-grow-0 w-full">
                      <Progress value={videoProgress} />
                    </div>
                  </div>
                )}
                {gameStage === GameStage.Answering && (
                  <div>
                    {isSuddenDeath && (
                      <>
                        <h1>SUDDEN DEATH</h1>
                        <br />
                        <hr />
                        <br />
                      </>
                    )}
                    {isTeam1Answering && <h1>Red is Answering</h1>}
                    {isTeam2Answering && <h1>Blue is Answering</h1>}
                    {!isTeam1Answering && !isTeam2Answering && (
                      <h1>Nobody is Answering ... ?</h1>
                    )}
                    {/* timer for remaining time to answer */}
                  </div>
                )}
                {gameStage === GameStage.Scoring && (
                  <>
                    <div>
                      {isTeam1Answering && <h1>Red is Correct</h1>}
                      {isTeam2Answering && <h1>Blue is Correct</h1>}
                      {!isTeam1Answering && !isTeam2Answering && (
                        <h1>Nobody Won the Points</h1>
                      )}
                      {/* timer for remaining time before next stage */}
                    </div>
                    <hr />
                    <div>
                      <h1>{gameQuestion.answer}</h1>
                      <h2>{gameQuestion.answerSubtext}</h2>
                    </div>
                  </>
                )}
                {gameStage === GameStage.Ending && (
                  <div>
                    <h1>Game Over</h1>
                    <h2>
                      {team1ScoreHistory > team2ScoreHistory
                        ? "Red Won!"
                        : team1ScoreHistory < team2ScoreHistory
                        ? "Blue Won!"
                        : "It's a Tie!"}
                    </h2>
                    Red Score: {team1ScoreHistory}
                    <br />
                    Blue Score: {team2ScoreHistory}
                    {/* timer for remaining time before next stage */}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Toaster />
      <DebugDialog />
    </>
  );
};

export default App;
