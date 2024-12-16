import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import { OnProgressProps } from "react-player/base";
import GameHeader from "../components/game-header";
import ReactPlayer from "react-player";
import { Progress } from "../components/ui/progress";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { GameStage } from "../types/game_types";

const GamePlayPage = () => {
  const currentGame = useGameStore((state) => state.currentGame);
  const gameStage = useGameStore((state) => state.stage);
  const questionId = useGameStore((state) => state.questionId);
  const gameQuestion = useGameStore(
    (state) => state.currentGame?.questions[state.questionId]
  );
  const isPaused = useGameStore((state) => state.isPaused);
  const updateLastVideoTime = useGameStore(
    (state) => state.updateLastVideoTime
  );
  const lastVideoTime = useGameStore((state) => state.lastVideoTime);
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
  const team1Theme = useGameStore((state) => state.team1Theme);
  const team2Theme = useGameStore((state) => state.team2Theme);
  const isSuddenDeath = useGameStore((state) => state.isSuddenDeath);

  const startSuddenDeath = useGameStore((state) => state.startSuddenDeath);
  const [videoProgress, setVideoProgress] = useState(0);
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
    <div className="card-page whole-screen flex flex-col bg-slate-700 text-amber-200 gap-8">
      <GameHeader
        leftIndicatorText="BUZZER"
        leftIndicatorTheme={team1Theme}
        leftIndicatorIsShaded={
          canTeam1Answer &&
          ((isSuddenDeath && !isTeam1Answering && !isTeam2Answering) ||
            (gameStage === GameStage.Playing &&
              !isTeam1Answering &&
              !isTeam2Answering))
        }
        leftIndicatorScore={team1ScoreHistory}
        rightIndicatorText="BUZZER"
        rightIndicatorTheme={team2Theme}
        rightIndicatorIsShaded={
          canTeam2Answer &&
          ((isSuddenDeath && !isTeam2Answering && !isTeam1Answering) ||
            (gameStage === GameStage.Playing &&
              !isTeam2Answering &&
              !isTeam1Answering))
        }
        rightIndicatorScore={team2ScoreHistory}
        headerTitle={currentGame?.title ?? ""}
        headerSubtitle={questionId + 1 + "/" + currentGame?.questions.length}
      />
      {gameQuestion && (
        <>
          <div className="flex flex-col items-center gap-4 flex-grow h-full">
            <h2>{gameQuestion.questionText}</h2>
            <div className="flex-grow flex flex-row justify-center w-full">
              <ReactPlayer
                key={`https://www.youtube.com/watch?v=${gameQuestion.videoYouTubeID}-${gameQuestion.videoEndTime}`}
                playing={!isPaused}
                controls={false}
                progressInterval={500}
                onEnded={() => handleVideoEnd()}
                onProgress={(e: OnProgressProps) => handleVideoProgress(e)}
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
          <Dialog open={gameStage !== GameStage.Playing}>
            <DialogContent className="border-none rounded-none min-w-[100%] min-h-[100%] flex flex-col items-center gap-4 flex-grow text-center bg-slate-700 text-amber-200">
              <GameHeader
                leftIndicatorText="BUZZER"
                leftIndicatorTheme={team1Theme}
                leftIndicatorIsShaded={
                  canTeam1Answer &&
                  ((gameStage === GameStage.Answering &&
                    !isTeam1Answering &&
                    !isTeam2Answering) ||
                    (gameStage === GameStage.Playing &&
                      !isTeam1Answering &&
                      !isTeam2Answering))
                }
                leftIndicatorScore={team1ScoreHistory}
                rightIndicatorText="BUZZER"
                rightIndicatorTheme={team2Theme}
                rightIndicatorIsShaded={
                  canTeam2Answer &&
                  ((gameStage === GameStage.Answering &&
                    !isTeam1Answering &&
                    !isTeam2Answering) ||
                    (gameStage === GameStage.Playing &&
                      !isTeam1Answering &&
                      !isTeam2Answering))
                }
                rightIndicatorScore={team2ScoreHistory}
                headerTitle={currentGame?.title ?? ""}
                headerSubtitle={
                  questionId + 1 + "/" + currentGame?.questions.length
                }
              />
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
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default GamePlayPage;
