import { create } from "zustand";
import { ButtonData, DebugButton, Game, GameStage } from "../types/game_types";
import { Games } from "../data/game_data";
import { devtools } from "zustand/middleware";
import { TeamTheme } from "../types/theme_types";
import {
  GameStatePartial,
  initialTeamState,
  newGameQuestionState,
  newGameState,
  TeamState,
} from "../types/state_types";

interface GameState extends GameStatePartial {
  currentGame: Game | undefined;
  teams: TeamState[];
  questionId: number;
  lastVideoTime: number;
  stage: GameStage;
  isPaused: boolean;
  lastStageChangeTime: number;
  isSuddenDeath: boolean;
  tempButtonCol: number;
  tempButtonRow: number;
  isDebugOpen: boolean;
  isGamepadDetected: boolean;
  symbolRight: (gamepadIndex: number) => void;
  symbolLeft: (gamepadIndex: number) => void;
  symbolUp: (gamepadIndex: number) => void;
  symbolDown: (gamepadIndex: number) => void;
  arrowRight: (gamepadIndex: number) => void;
  arrowLeft: (gamepadIndex: number) => void;
  arrowUp: (gamepadIndex: number) => void;
  arrowDown: (gamepadIndex: number) => void;
  gamepadButtonPress: (e: { gamepad: Gamepad; button: number }) => void;
  answerQuestion: (gamepadIndex: number) => void;
  correctAnswer: () => void;
  incorrectAnswer: () => void;
  startSuddenDeath: () => void;
  updateLastVideoTime: (videoTime: number) => void;
  resetLastStageChangeTime: () => void;
  advanceStage: () => void;
  selectQuiz: (id: number) => void;
  toggleDebugDialog: () => void;
  debugAbandonQuiz: () => void;
  debugRestartQuiz: () => void;
  debugScoreQuiz: () => void;
  debugBackQuestion: () => void;
  debugForwardQuestion: () => void;
  debugClearScore: () => void;
  debugRemoveScore: () => void;
  debugAddScore: () => void;
  debugIncreaseTeamScore: (teamId: number) => void;
  debugDecreaseTeamScore: (teamId: number) => void;
  selectDebugButton: (teamId?: number) => void;
  selectTeamColor: (teamId: number, team: TeamTheme) => void;
}

export const useGameStore = create<GameState>()(
  devtools((set, get) => ({
    currentGame: undefined,
    teams: initialTeamState,
    ...newGameState,
    lastStageChangeTime: 0,
    tempButtonCol: 0,
    tempButtonRow: 0,
    isDebugOpen: false,
    isGamepadDetected: false,
    symbolRight: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === gamepadIndex ? { ...team, lastPress: Date.now() } : team
          ),
        }));
        get().answerQuestion(gamepadIndex);
        return;
      }
      // cancel / no / wrong
      const stage = useGameStore.getState().stage;
      if (stage === GameStage.Answering || stage === GameStage.Scoring) {
        get().incorrectAnswer();
      }
    },
    symbolLeft: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === gamepadIndex ? { ...team, lastPress: Date.now() } : team
          ),
        }));
        get().answerQuestion(gamepadIndex);
        return;
      }
      // also pause?
    },
    symbolUp: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === gamepadIndex ? { ...team, lastPress: Date.now() } : team
          ),
        }));
        get().answerQuestion(gamepadIndex);
        return;
      } else {
        get().toggleDebugDialog();
      }
      // pause?
    },
    symbolDown: (gamepadIndex: number) => {
      const stage = useGameStore.getState().stage;
      if (gamepadIndex !== 0) {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === gamepadIndex ? { ...team, lastPress: Date.now() } : team
          ),
        }));
        get().answerQuestion(gamepadIndex);
      } else {
        if (get().isDebugOpen) {
          // select the button we're on
          get().selectDebugButton();
        } else if (stage === GameStage.Answering) {
          get().correctAnswer();
          return;
        } else {
          get().advanceStage();
          return;
        }
      }
    },
    arrowRight: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) return;
      set((state) => ({
        tempButtonCol:
          state.tempButtonCol === ButtonData[0].length - 1
            ? ButtonData[0].length - 1
            : state.tempButtonCol + 1,
      }));
    },
    arrowLeft: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) return;
      set((state) => ({
        tempButtonCol: state.tempButtonCol === 0 ? 0 : state.tempButtonCol - 1,
      }));
    },
    arrowUp: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) return;
      set((state) => ({
        tempButtonRow: state.tempButtonRow === 0 ? 0 : state.tempButtonRow - 1,
      }));
    },
    arrowDown: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) return;
      set((state) => ({
        tempButtonRow:
          state.tempButtonRow === ButtonData.length - 1
            ? ButtonData.length - 1
            : state.tempButtonRow + 1,
      }));
    },
    gamepadButtonPress: (e: { gamepad: Gamepad; button: number }) => {
      const newEvent = `Gamepad button down at index ${e.gamepad.index}: ${e.gamepad.id}. Button: ${e.button}.`;
      console.log(newEvent);
      set({ isGamepadDetected: true });
      switch (e.button) {
        case 15:
          get().arrowRight(e.gamepad.index);
          break;
        case 14:
          get().arrowLeft(e.gamepad.index);
          break;
        case 13:
          get().arrowDown(e.gamepad.index);
          break;
        case 12:
          get().arrowUp(e.gamepad.index);
          break;
        case 3:
          get().symbolUp(e.gamepad.index);
          break;
        case 2:
          get().symbolLeft(e.gamepad.index);
          break;
        case 1:
          get().symbolRight(e.gamepad.index);
          break;
        case 0:
          get().symbolDown(e.gamepad.index);
          break;
        default:
          break;
      }
    },
    answerQuestion: (gamepadIndex: number) => {
      // A team can only answer when it's the playing stage
      // or if it's the answering stage and neither team triggered it
      // aka time expired and automatically advanced the stage
      const stage = useGameStore.getState().stage;
      if (
        !(
          stage === GameStage.Playing ||
          (stage === GameStage.Answering &&
            !get().teams.some((team) => team.isAnswering))
        )
      )
        return;
      // The game master cannot answer
      if (gamepadIndex === 0) return;
      const foundTeam = get().teams.find((team) => team.id === gamepadIndex);
      if (!foundTeam) return;
      // If team 1 pressed the button
      if (foundTeam.canAnswer) {
        // if they can answer, set that they're answering
        // if the other team has answered, reset to allow either to answer later
        // else just prevent the same team from answering until the other team answers
        //
        const answerableTeams = get().teams.filter((team) => team.canAnswer);
        // if the length of the answerable teams is 1, then that means only this
        // team can answer and is answering so reset to allow any team to answer
        if (answerableTeams.length === 1) {
          set((state) => ({
            stage: GameStage.Answering,
            isPaused: true,
            teams: state.teams.map((team) =>
              // if the team is the one that just pressed, set them to be answering
              // set all to be able to answer
              team.id === gamepadIndex
                ? { ...team, isAnswering: true, canAnswer: true }
                : { ...team, canAnswer: true }
            ),
          }));
        }
        // else there are still other teams that can answer
        set((state) => ({
          stage: GameStage.Answering,
          isPaused: true,
          teams: state.teams.map((team) =>
            team.id === gamepadIndex
              ? // if the team is the one that just pressed, set them to be answering
                // set this team to not be able to answer again and don't mess with the others
                { ...team, isAnswering: true, canAnswer: false }
              : team
          ),
        }));
      }
    },
    correctAnswer: () => {
      const stage = get().stage;
      if (stage !== GameStage.Answering) return;
      set((state) => ({
        stage: GameStage.Scoring,
        teams: state.teams.map((team) => ({
          ...team,
          isAnswering: false,
          scoreHistory: [...team.scoreHistory, team.isAnswering ? 1 : 0],
        })),
      }));
    },
    incorrectAnswer: () => {
      const stage = get().stage;
      if (stage !== GameStage.Answering) return;
      const canAnswerTeams = get().teams.filter((team) => team.canAnswer);
      set((state) =>
        // if it's sudden death
        state.isSuddenDeath
          ? // if all teams have answered
            canAnswerTeams.length === 0
            ? // advance to the next stage & add 0 entry for each team score
              {
                stage: GameStage.Scoring,
                teams: state.teams.map((team) => ({
                  ...team,
                  isAnswering: false,
                  scoreHistory: [...team.scoreHistory, 0],
                })),
              }
            : // else, stay and let the other teams answer
            canAnswerTeams.length === 1
            ? // if only one team can answer, they are now answering
              {
                stage: GameStage.Answering,
                teams: state.teams.map((team) => ({
                  ...team,
                  isAnswering: team.canAnswer,
                })),
              }
            : // else there are still multiple teams that can answer
              {
                stage: GameStage.Answering,
                teams: state.teams.map((team) => ({
                  ...team,
                  isAnswering: false,
                })),
              }
          : // else just an incorrect answer during video playback
            {
              stage: GameStage.Playing,
              isPaused: false,
              isTeam1Answering: false,
              isTeam2Answering: false,
            }
      );
    },
    startSuddenDeath: () => {
      const stage = get().stage;
      if (stage !== GameStage.Playing) return;
      set({
        stage: GameStage.Answering,
        isPaused: true,
        isSuddenDeath: true,
        teams: get().teams.map((team) => ({
          ...team,
          isAnswering: false,
          canAnswer: true,
        })),
      });
    },
    updateLastVideoTime: (time: number) => {
      set({ lastVideoTime: time });
    },
    resetLastStageChangeTime: () => {
      set({ lastStageChangeTime: Date.now() });
    },
    advanceStage: () => {
      if (!get().currentGame) return;
      // Waiting -> Playing -> Answering -> Scoring -> (if last question) Ending -> (Loop to Waiting)
      switch (get().stage) {
        case GameStage.Waiting:
          set({
            stage: GameStage.Playing,
            teams: get().teams.map((team) => ({
              ...team,
              canAnswer: true,
            })),
            isPaused: false,
          });
          break;
        case GameStage.Playing:
          set({ stage: GameStage.Answering, isPaused: true });
          break;
        case GameStage.Answering:
          set({
            stage: GameStage.Scoring,
            teams: get().teams.map((team) => ({
              ...team,
              canAnswer: false,
            })),
            isPaused: true,
          });
          break;
        case GameStage.Scoring:
          set((state) =>
            state.currentGame &&
            state.currentGame.questions.length > state.questionId + 1
              ? // if we're playing a game, & there's more questions
                {
                  ...newGameQuestionState,
                  questionId: state.questionId + 1,
                }
              : // if there are no more questions, end the game
                {
                  stage: GameStage.Ending,
                  lastVideoTime: 0,
                  isTeam1Answering: false,
                  isTeam2Answering: false,
                  isSuddenDeath: false,
                }
          );
          break;
        case GameStage.Ending:
          set(() => ({
            ...newGameState,
            currentGame: undefined,
          }));
          break;
        default:
          break;
      }
    },
    selectQuiz(id: number) {
      const foundGame = Games.find((game) => game.id === id);
      if (!foundGame) return;
      set({ currentGame: foundGame, questionId: 0 });
    },
    toggleDebugDialog: () =>
      set((state) => ({
        isDebugOpen: !state.isDebugOpen,
        isPaused:
          state.stage === GameStage.Playing
            ? !state.isDebugOpen
            : state.isPaused,
      })),
    debugAbandonQuiz: () => {
      set(() => ({
        ...newGameState,
        currentGame: undefined,
      }));
    },
    debugRestartQuiz: () => {
      if (!get().currentGame) return;
      set(() => ({
        ...newGameState,
      }));
    },
    debugScoreQuiz: () => {
      if (!get().currentGame) return;
      set(() => ({
        stage: GameStage.Ending,
      }));
    },
    debugBackQuestion: () => {
      if (get().questionId === 0) return;
      set((state) => ({
        stage: GameStage.Waiting,
        questionId: state.questionId - 1,
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory: team.scoreHistory.slice(0, -1),
        })),
      }));
    },
    debugForwardQuestion: () => {
      if (
        !get().currentGame ||
        get().questionId >= (get().currentGame?.questions.length ?? 0) - 1
      )
        return;
      set((state) => ({
        stage: GameStage.Waiting,
        questionId: state.questionId + 1,
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory: [...team.scoreHistory, 0],
        })),
      }));
    },
    debugClearScore: () => {
      set((state) => ({
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory: [...team.scoreHistory.slice(0, -1), 0],
        })),
      }));
    },
    debugRemoveScore: () => {
      set((state) => ({
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory: team.scoreHistory.slice(0, -1),
        })),
      }));
    },
    debugAddScore: () => {
      set((state) => ({
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory: [...team.scoreHistory, 0],
        })),
      }));
    },
    debugIncreaseTeamScore: (teamId: number) => {
      const foundTeam = get().teams.find((team) => team.id === teamId);
      if (!foundTeam || foundTeam.scoreHistory.length === 0) return;
      set((state) => ({
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory:
            team.id === teamId
              ? [
                  ...team.scoreHistory.slice(0, -1),
                  (team.scoreHistory.at(-1) ?? 0) + 1,
                ]
              : team.scoreHistory,
        })),
      }));
    },
    debugDecreaseTeamScore: (teamId: number) => {
      const foundTeam = get().teams.find((team) => team.id === teamId);
      if (!foundTeam || foundTeam.scoreHistory.length === 0) return;
      set((state) => ({
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory:
            team.id === teamId
              ? [
                  ...team.scoreHistory.slice(0, -1),
                  (team.scoreHistory.at(-1) ?? 0) - 1,
                ]
              : team.scoreHistory,
        })),
      }));
    },
    selectDebugButton: (teamId?: number) => {
      const selectedButton =
        ButtonData[get().tempButtonRow][get().tempButtonCol];
      switch (selectedButton) {
        case DebugButton.ABANDON_QUIZ:
          get().debugAbandonQuiz();
          break;
        case DebugButton.RESTART_QUIZ:
          get().debugRestartQuiz();
          break;
        case DebugButton.SCORE_QUIZ:
          get().debugScoreQuiz();
          break;
        case DebugButton.BACK_QUESTION:
          get().debugBackQuestion();
          break;
        case DebugButton.FORWARD_QUESTION:
          get().debugForwardQuestion();
          break;
        case DebugButton.CLEAR_SCORE:
          get().debugClearScore();
          break;
        case DebugButton.REMOVE_SCORE:
          get().debugRemoveScore();
          break;
        case DebugButton.ADD_SCORE:
          get().debugAddScore();
          break;
        case DebugButton.INCREASE_TEAM_SCORE:
          get().debugIncreaseTeamScore(teamId ?? 0);
          break;
        case DebugButton.DECREASE_TEAM_SCORE:
          get().debugDecreaseTeamScore(teamId ?? 0);
          break;
          break;
        case DebugButton.CLOSE:
          get().toggleDebugDialog();
          break;
        default:
          break;
      }
    },
    selectTeamColor: (teamId, theme) => {
      const otherSelectedThemes = get()
        .teams.filter((team) => team.id !== teamId)
        .map((team) => team.theme);
      const foundTeam = get().teams.find((team) => team.id === teamId);
      // if the team doesn't exist or the theme is already selected, do nothing
      if (!foundTeam) return;
      if (otherSelectedThemes.includes(theme)) return;

      set((state) => ({
        teams: state.teams.map((team) => ({
          ...team,
          theme: team.id === teamId ? theme : team.theme,
          lastPress: team.id === teamId ? Date.now() : team.lastPress,
        })),
      }));
    },
  }))
);
