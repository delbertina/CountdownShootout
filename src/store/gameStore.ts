import { create } from "zustand";

enum GameStage {
  Testing = "TESTING",
  Waiting = "WAITING",
  Playing = "PLAYING",
  Answering = "ANSWERING",
  Scoring = "SCORING",
}

interface GameState {
  questionId: number;
  team1ScoreHistory: number[];
  team2ScoreHistory: number[];
  stage: GameStage;
  isPaused: boolean;
  remainingTime: number;
  canTeam1Answer: boolean;
  canTeam2Answer: boolean;
  isTeam1Answering: boolean;
  isTeam2Answering: boolean;
  tempButtonCol: number;
  tempButtonRow: number;
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
  advanceStage: () => void;
  completeQuestion: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  questionId: 0,
  team1ScoreHistory: [],
  team2ScoreHistory: [],
  stage: GameStage.Testing,
  isPaused: true,
  remainingTime: 0,
  canTeam1Answer: false,
  canTeam2Answer: false,
  isTeam1Answering: false,
  isTeam2Answering: false,
  tempButtonCol: 1,
  tempButtonRow: 1,
  symbolRight: (gamepadIndex: number) => {
    if (
      gamepadIndex !== 0 &&
      useGameStore.getState().stage !== GameStage.Testing
    )
      return;
    // cancel?
  },
  symbolLeft: (gamepadIndex: number) => {
    if (
      gamepadIndex !== 0 &&
      useGameStore.getState().stage !== GameStage.Testing
    )
      return;
    // also pause?
  },
  symbolUp: (gamepadIndex: number) => {
    if (
      gamepadIndex !== 0 &&
      useGameStore.getState().stage !== GameStage.Testing
    )
      return;
    // pause?
  },
  symbolDown: (gamepadIndex: number) => {
    const stage = useGameStore.getState().stage;
    if (
      gamepadIndex !== 0
    ) {
      if (stage === GameStage.Testing) {
        // do something during the testing stage
        return;
      }
      if (stage === GameStage.Answering) {
        get().answerQuestion(gamepadIndex);
      }
      return;
    }
    if (stage === GameStage.Answering || stage === GameStage.Scoring) {
      get().correctAnswer();
      return;
    } else {
      get().advanceStage();
      return;
    }

    // get().advanceStage();
    // set({ tempButtonCol: 1, tempButtonRow: 1 });
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
    if (get().stage !== GameStage.Playing) return;
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
      stage: GameStage.Waiting,
      // TODO: Check if new index in range
      questionId: state.questionId + 1,
      team1ScoreHistory: [
        ...state.team1ScoreHistory,
        state.isTeam1Answering ? 1 : 0,
      ],
      team2ScoreHistory: [
        ...state.team2ScoreHistory,
        state.isTeam2Answering ? 1 : 0,
      ],
      canTeam1Answer: true,
      canTeam2Answer: true,
      isTeam1Answering: false,
      isTeam2Answering: false,
    }));
  },
  incorrectAnswer: () => {
    const stage = get().stage;
    if (stage !== GameStage.Scoring && stage !== GameStage.Answering) return;
    set(() => ({stage: GameStage.Playing, isPaused: false}));
  },
  advanceStage: () => {
    // Testing -> Waiting -> Playing -> Answering -> Scoring -> (Loop to Waiting)
    switch (get().stage) {
      case GameStage.Testing:
        set({ stage: GameStage.Waiting });
        break;
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
        set({ stage: GameStage.Waiting });
        break;
      default:
        break;
    }
  },

  completeQuestion: () =>
    set((state) => ({ questionId: state.questionId + 1 })),
}));

// Temp button array
// Actions Needed:
// - Edit Score
// - View Score History
// - Skip Question
// - Skip Section
// - Redo Question
// - Manually Change Question
// - Debug Controllers
// - ???
// - Middle = Resume

export const ButtonData = [
  ["Zero", "One", "Two"],
  ["Three", "Four", "Five"],
  ["Six", "Seven", "Eight"],
];
