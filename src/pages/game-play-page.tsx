import { useMemo, useState } from "react";
import { useGameStore } from "../store/gameStore";
import { OnProgressProps } from "react-player/base";
import GameHeader from "../components/game-header";
import ReactPlayer from "react-player";
import { Progress } from "../components/ui/progress";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { GameStage } from "../types/game_types";
import { getTeamDisplayName } from "../types/state_types";
import ShadedIndicator from "../components/shaded-indicator";
import { padNumber } from "../lib/utils";

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
  const teams = useGameStore((state) => state.teams);
  const maxScore = useMemo(
    () =>
      Math.max(
        ...teams.map((team) =>
          team.scoreHistory.reduce((sum, current) => sum + current, 0)
        )
      ),
    [teams]
  );
  const isAnswering = useMemo(
    () => teams.some((team) => !!team.isAnswering),
    [teams]
  );
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
    <div className="card-page whole-screen flex flex-col items-center bg-slate-700 text-amber-200 gap-4">
      {/* <GameHeader
        indicatorText="BUZZER"
        headerTitle={currentGame?.title ?? ""}
        headerSubtitle={questionId + 1 + "/" + currentGame?.questions.length}
      /> */}
      {gameQuestion && (
        <>
          <div className="flex flex-row h-full w-full gap-4 grow">
            <div className="flex flex-col gap-4">
              {teams
                .filter((_team, i) => i % 2 === 0)
                .map((team) => (
                  <div className="flex flex-row gap-4">
                    <ShadedIndicator
                      text={"BUZZER"}
                      theme={team.theme}
                      isShaded={
                        // if the team can answer,
                        // nobody is answering currently,
                        // and it's either sudden death or the playing stage
                        team.canAnswer &&
                        !isAnswering &&
                        (isSuddenDeath || gameStage === GameStage.Playing)
                      }
                    />
                    <div className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      <h1>
                        {padNumber(team.scoreHistory.reduce(
                          (sum, current) => sum + current,
                          0
                        ), 2)}
                      </h1>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-col grow gap-4">
              <div className="flex flex-col justify-between overflow-hidden grow-0">
                <div className="font-bold text-xl truncate">
                  <h2>{currentGame?.title ?? ""}</h2>
                </div>
                <div>
                  <h2>
                    {questionId + 1 + "/" + currentGame?.questions.length}
                  </h2>
                </div>
                <div>
                  <h2>{gameQuestion.questionText}</h2>
                </div>
              </div>
              <div className="flex-grow flex flex-col justify-end w-full gap-4">
              <div>
                <ReactPlayer
                  key={`https://www.youtube.com/watch?v=${gameQuestion.videoYouTubeID}-${gameQuestion.videoEndTime}`}
                  playing={!isPaused}
                  controls={false}
                  progressInterval={500}
                  onEnded={() => handleVideoEnd()}
                  onProgress={(e: OnProgressProps) => handleVideoProgress(e)}
                  className="react-player"
                  width="100%"
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
            </div>
            <div className="flex flex-col gap-4">
              {teams
                .filter((_team, i) => i % 2 === 1)
                .map((team) => (
                  <div className="flex flex-row gap-4">
                    <div className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      <h1>
                        {padNumber(team.scoreHistory.reduce(
                          (sum, current) => sum + current,
                          0
                        ), 2)}
                      </h1>
                    </div>
                    <ShadedIndicator
                      text={"BUZZER"}
                      theme={team.theme}
                      isShaded={
                        // if the team can answer,
                        // nobody is answering currently,
                        // and it's either sudden death or the playing stage
                        team.canAnswer &&
                        !isAnswering &&
                        (isSuddenDeath || gameStage === GameStage.Playing)
                      }
                    />
                  </div>
                ))}
            </div>
          </div>
          <Dialog open={gameStage !== GameStage.Playing}>
            <DialogContent className="border-none rounded-none min-w-[100%] min-h-[100%] flex flex-col items-center gap-4 flex-grow text-center bg-slate-700 text-amber-200">
              <GameHeader
                indicatorText="BUZZER"
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
                  {teams
                    .filter((team) => !!team.isAnswering)
                    .map((team) => (
                      <h1>{getTeamDisplayName(team)} is answering</h1>
                    ))}
                  {!isAnswering && <h1>Nobody is answering ... ?</h1>}
                  {/* timer for remaining time to answer */}
                </div>
              )}
              {gameStage === GameStage.Scoring && (
                <>
                  <div>
                    {teams
                      .filter((team) => !!team.isAnswering)
                      .map((team) => (
                        <h1>{getTeamDisplayName(team)} is correct</h1>
                      ))}
                    {!isAnswering && <h1>Nobody won the points</h1>}
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
                    {teams
                      .filter(
                        (team) =>
                          team.scoreHistory.reduce(
                            (sum, current) => sum + current,
                            0
                          ) === maxScore
                      )
                      .map((team) => (
                        <h1>{getTeamDisplayName(team)} Won!</h1>
                      ))}
                  </h2>
                  {teams.map((team) => (
                    <>
                      <h1>{getTeamDisplayName(team)} Score: </h1>
                      {team.scoreHistory.reduce(
                        (sum, current) => sum + current,
                        0
                      )}
                      <br />
                    </>
                  ))}
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
