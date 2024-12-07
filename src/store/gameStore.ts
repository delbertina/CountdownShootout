import { create } from "zustand";
import { ButtonData, DebugButton, Game, GameStage } from "../types/game_types";
import { Games } from "../data/game_data";
import { devtools } from "zustand/middleware";

// Partial game state for reset question
interface GameStatePartialQuestion {
  stage: GameStage;
  lastVideoTime: number;
  canTeam1Answer: boolean;
  canTeam2Answer: boolean;
  isTeam1Answering: boolean;
  isTeam2Answering: boolean;
  isSuddenDeath: boolean;
}

// Partial game state for reset game
interface GameStatePartial extends GameStatePartialQuestion {
  questionId: number;
  team1ScoreHistory: number[];
  team2ScoreHistory: number[];
  isPaused: boolean;
}

const newGameQuestionState: GameStatePartialQuestion = {
  stage: GameStage.Waiting,
  lastVideoTime: 0,
  canTeam1Answer: false,
  canTeam2Answer: false,
  isTeam1Answering: false,
  isTeam2Answering: false,
  isSuddenDeath: false,
};

const newGameState: GameStatePartial = {
  questionId: 0,
  team1ScoreHistory: [],
  team2ScoreHistory: [],
  isPaused: true,
  ...newGameQuestionState,
};

interface GameState extends GameStatePartial {
  currentGame: Game | undefined;
  questionId: number;
  lastVideoTime: number;
  team1ScoreHistory: number[];
  team2ScoreHistory: number[];
  stage: GameStage;
  isPaused: boolean;
  lastStageChangeTime: number;
  lastTeam1Press: number;
  lastTeam2Press: number;
  canTeam1Answer: boolean;
  canTeam2Answer: boolean;
  isTeam1Answering: boolean;
  isTeam2Answering: boolean;
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
  selectDebugButton: () => void;
}

export const useGameStore = create<GameState>()(
  devtools((set, get) => ({
    currentGame: undefined,
    ...newGameState,
    lastStageChangeTime: 0,
    lastTeam1Press: 0,
    lastTeam2Press: 0,
    tempButtonCol: 0,
    tempButtonRow: 0,
    isDebugOpen: false,
    isGamepadDetected: false,
    symbolRight: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) {
        if (gamepadIndex === 1) {
          set(() => ({ lastTeam1Press: Date.now() }));
        } else if (gamepadIndex === 2) {
          set(() => ({ lastTeam2Press: Date.now() }));
        }
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
        if (gamepadIndex === 1) {
          set(() => ({ lastTeam1Press: Date.now() }));
        } else if (gamepadIndex === 2) {
          set(() => ({ lastTeam2Press: Date.now() }));
        }
        get().answerQuestion(gamepadIndex);
        return;
      }
      // also pause?
    },
    symbolUp: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) {
        if (gamepadIndex === 1) {
          set(() => ({ lastTeam1Press: Date.now() }));
        } else if (gamepadIndex === 2) {
          set(() => ({ lastTeam2Press: Date.now() }));
        }
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
        if (gamepadIndex === 1) {
          set(() => ({ lastTeam1Press: Date.now() }));
        } else if (gamepadIndex === 2) {
          set(() => ({ lastTeam2Press: Date.now() }));
        }
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
            !get().isTeam1Answering &&
            !get().isTeam2Answering)
        )
      )
        return;
      // The game master cannot answer
      if (gamepadIndex === 0) return;
      const can1Ans = get().canTeam1Answer;
      const can2Ans = get().canTeam2Answer;
      // If team 1 pressed the button
      if (gamepadIndex === 1) {
        // if they can't answer, return
        if (!can1Ans) return;
        // if they can answer, set that they're answering
        // if the other team has answered, reset to allow either to answer later
        // else just prevent the same team from answering until the other team answers
        set({
          stage: GameStage.Answering,
          isPaused: true,
          isTeam1Answering: true,
          isTeam2Answering: false,
          canTeam1Answer: !can2Ans,
          canTeam2Answer: true,
        });
      }
      if (gamepadIndex === 2) {
        if (!can2Ans) return;
        set({
          stage: GameStage.Answering,
          isPaused: true,
          isTeam1Answering: false,
          isTeam2Answering: true,
          canTeam1Answer: true,
          canTeam2Answer: !can1Ans,
        });
      }
    },
    correctAnswer: () => {
      const stage = get().stage;
      if (stage !== GameStage.Scoring && stage !== GameStage.Answering) return;
      set((state) => ({
        stage: GameStage.Scoring,
        team1ScoreHistory: [
          ...state.team1ScoreHistory,
          state.isTeam1Answering ? 1 : 0,
        ],
        team2ScoreHistory: [
          ...state.team2ScoreHistory,
          state.isTeam2Answering ? 1 : 0,
        ],
        canTeam1Answer: false,
        canTeam2Answer: false,
      }));
    },
    incorrectAnswer: () => {
      const stage = get().stage;
      if (stage !== GameStage.Answering) return;
      set((state) =>
        // if it's sudden death
        state.isSuddenDeath
          ? // if both teams have answered
            !state.canTeam1Answer && !state.canTeam2Answer
            ? // advance to the next stage
              {
                stage: GameStage.Scoring,
                isTeam1Answering: false,
                isTeam2Answering: false,
              }
            : // else, stay and let the other team answer
              {
                stage: GameStage.Answering,
                // whichever team is left able to answer is now answering
                isTeam1Answering: state.canTeam1Answer,
                isTeam2Answering: state.canTeam2Answer,
                // after this, neither team can answer again since it's sudden death
                // so if the other teams answers incorrectly,
                // it will hit the previous if statement and continue to scoring
                canTeam1Answer: false,
                canTeam2Answer: false,
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
        canTeam1Answer: true,
        canTeam2Answer: true,
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
            canTeam1Answer: true,
            canTeam2Answer: true,
            isPaused: false,
          });
          break;
        case GameStage.Playing:
          set({ stage: GameStage.Answering, isPaused: true });
          break;
        case GameStage.Answering:
          set({
            stage: GameStage.Scoring,
            canTeam1Answer: false,
            canTeam2Answer: false,
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
    selectDebugButton: () => {
      const selectedButton =
        ButtonData[get().tempButtonRow][get().tempButtonCol];
      console.log("selectDebugButton", selectedButton);
      switch (selectedButton) {
        case DebugButton.ABANDON_QUIZ:
          set(() => ({
            ...newGameState,
            currentGame: undefined,
          }));
          break;
        case DebugButton.RESTART_QUIZ:
          if (!get().currentGame) return;
          set(() => ({
            ...newGameState,
          }));
          break;
        case DebugButton.SCORE_QUIZ:
          if (!get().currentGame) return;
          set(() => ({
            stage: GameStage.Ending,
          }));
          break;
        case DebugButton.BACK_QUESTION:
          if (get().questionId === 0) return;
          set((state) => ({
            stage: GameStage.Waiting,
            questionId: state.questionId - 1,
            team1ScoreHistory:
              state.team1ScoreHistory.length >= state.questionId + 1
                ? state.team1ScoreHistory.slice(0, -1)
                : state.team1ScoreHistory,
            team2ScoreHistory:
              state.team2ScoreHistory.length >= state.questionId + 1
                ? state.team2ScoreHistory.slice(0, -1)
                : state.team2ScoreHistory,
          }));
          break;
        case DebugButton.FORWARD_QUESTION:
          if (
            !get().currentGame ||
            get().questionId >= (get().currentGame?.questions.length ?? 0) - 1
          )
            return;
          set((state) => ({
            stage: GameStage.Waiting,
            questionId: state.questionId + 1,
            team1ScoreHistory: [...state.team1ScoreHistory, 0],
            team2ScoreHistory: [...state.team2ScoreHistory, 0],
          }));
          break;
        case DebugButton.CLEAR_SCORE:
          set((state) => ({
            team1ScoreHistory: [...state.team1ScoreHistory.slice(0, -1), 0],
            team2ScoreHistory: [...state.team2ScoreHistory.slice(0, -1), 0],
          }));
          break;
        case DebugButton.REMOVE_SCORE:
          set((state) => ({
            team1ScoreHistory: state.team1ScoreHistory.slice(0, -1),
            team2ScoreHistory: state.team2ScoreHistory.slice(0, -1),
          }));
          break;
        case DebugButton.ADD_SCORE:
          set((state) => ({
            team1ScoreHistory: [...state.team1ScoreHistory, 0],
            team2ScoreHistory: [...state.team2ScoreHistory, 0],
          }));
          break;
        case DebugButton.INCREASE_RED_SCORE:
          if (get().team1ScoreHistory.length === 0) return;
          set((state) => ({
            team1ScoreHistory: [
              ...state.team1ScoreHistory.slice(0, -1),
              (state.team1ScoreHistory.at(-1) ?? 0) + 1,
            ],
          }));
          break;
        case DebugButton.DECREASE_RED_SCORE:
          if (get().team1ScoreHistory.length === 0) return;
          set((state) => ({
            team1ScoreHistory: [
              ...state.team1ScoreHistory.slice(0, -1),
              (state.team1ScoreHistory.at(-1) ?? 0) - 1,
            ],
          }));
          break;
        case DebugButton.INCREASE_BLUE_SCORE:
          if (get().team2ScoreHistory.length === 0) return;
          set((state) => ({
            team2ScoreHistory: [
              ...state.team2ScoreHistory.slice(0, -1),
              (state.team2ScoreHistory.at(-1) ?? 0) + 1,
            ],
          }));
          break;
        case DebugButton.DECREASE_BLUE_SCORE:
          if (get().team2ScoreHistory.length === 0) return;
          set((state) => ({
            team2ScoreHistory: [
              ...state.team2ScoreHistory.slice(0, -1),
              (state.team2ScoreHistory.at(-1) ?? 0) - 1,
            ],
          }));
          break;
        case DebugButton.CLOSE:
          get().toggleDebugDialog();
          break;
        default:
          break;
      }
    },
  }))
);
