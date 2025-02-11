import { useEffect, useMemo, useState } from "react";
import { useGameStore } from "../store/gameStore";
import { OnProgressProps } from "react-player/base";
import ReactPlayer from "react-player";
import { Progress } from "../components/ui/progress";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { DEFAULT_ANSWER_TIMEOUT, DEFAULT_INFO_TIMEOUT, GameStage } from "../types/game_types";
import { getTeamDisplayName } from "../types/state_types";
import { GameHeader } from "../components/ui/game-header";

const GamePlayPage = () => {
  const currentGame = useGameStore((state) => state.currentGame);
  const infoTimeout = useMemo(() => currentGame?.settings?.infoTimeout??DEFAULT_INFO_TIMEOUT, [currentGame]);
  const lastInfoTime = useGameStore((state) => state.lastInfoTime);
  const infoTimeoutEnded = useGameStore((state) => state.infoTimeoutEnded);
  const answerTimeout = useMemo(() => currentGame?.settings?.answerTimeout??DEFAULT_ANSWER_TIMEOUT, [currentGame]);
  const lastAnswerTime = useGameStore((state) => state.lastAnswerTime);
  const answerTimeoutEnded = useGameStore((state) => state.answerTimeoutEnded);
  const gameStage = useGameStore((state) => state.stage);
  // const questionId = useGameStore((state) => state.questionId);
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
    setVideoProgress(
      ((e.playedSeconds - gameQuestion.questionVideo.startTime) /
        (gameQuestion.questionVideo.endTime - gameQuestion.questionVideo.startTime)) *
        100
    );
    updateLastVideoTime(e.playedSeconds);
  };

  const handleVideoEnd = (): void => {
    setVideoProgress(0);
    startSuddenDeath();
  };

  useEffect(() => {
    if (gameStage === GameStage.Answering) {
      setTimeout(() => {
        answerTimeoutEnded();
      }, answerTimeout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastAnswerTime]);

  useEffect(() => {
    if (gameStage === GameStage.Waiting) {
      setTimeout(() => {
        infoTimeoutEnded();
      }, infoTimeout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastInfoTime]);

  return (
    <div className="card-page whole-screen flex flex-col items-center bg-slate-700 text-amber-200 gap-4">
      {gameQuestion && (
        <>
          <GameHeader
            content={
              <div className="flex-grow flex flex-col justify-end w-full gap-4">
                <div>
                  <ReactPlayer
                    key={`https://www.youtube.com/watch?v=${gameQuestion.questionVideo.youTubeID}`}
                    playing={!isPaused}
                    controls={false}
                    progressInterval={500}
                    onEnded={() => handleVideoEnd()}
                    onProgress={(e: OnProgressProps) => handleVideoProgress(e)}
                    className="react-player"
                    width="100%"
                    url={
                      "https://www.youtube.com/watch?v=" +
                      gameQuestion.questionVideo.youTubeID
                    }
                    config={{
                      youtube: {
                        playerVars: {
                          // start and end need a whole number
                          start: !lastVideoTime
                            ? Math.floor(gameQuestion.questionVideo.startTime)
                            : Math.floor(lastVideoTime),
                          end: Math.floor(gameQuestion.questionVideo.endTime),
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
            }
          ></GameHeader>
          <Dialog open={gameStage !== GameStage.Playing}>
            <DialogContent className="border-none rounded-none min-w-[100%] min-h-[100%] flex flex-col items-center gap-4 flex-grow text-center bg-slate-700 text-amber-200">
              <GameHeader
                content={
                  <>
                    {gameStage === GameStage.Waiting && (
                      <div>
                        <h1>{gameQuestion.questionText}</h1>
                        <h2>
                          {gameQuestion.questionVideo.endTime -
                            gameQuestion.questionVideo.startTime}{" "}
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
                        <br />
                        {teams.map((team) => (
                          <>
                            <p>{getTeamDisplayName(team)}{": "}
                            {team.scoreHistory.reduce(
                              (sum, current) => sum + current,
                              0
                            )}</p>
                          </>
                        ))}
                        {/* timer for remaining time before next stage */}
                      </div>
                    )}
                  </>
                }
              ></GameHeader>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default GamePlayPage;
