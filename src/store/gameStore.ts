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
  stage: GameStage;
  tempButtonCol: number;
  tempButtonRow: number;
  symbolDown: (gamepadIndex: number) => void;
  arrowRight: (gamepadIndex: number) => void;
  arrowLeft: (gamepadIndex: number) => void;
  arrowUp: (gamepadIndex: number) => void;
  arrowDown: (gamepadIndex: number) => void;
  gamepadButtonPress: (e: { gamepad: Gamepad; button: number }) => void;
  advanceStage: () => void;
  completeQuestion: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  questionId: 0,
  stage: GameStage.Testing,
  tempButtonCol: 1,
  tempButtonRow: 1,
  symbolDown: (gamepadIndex: number) => {
    if (
      gamepadIndex !== 0 &&
      useGameStore.getState().stage !== GameStage.Testing
    )
      return;
    get().advanceStage();
    set({ tempButtonCol: 1, tempButtonRow: 1 });
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
      case 14:
        get().arrowLeft(e.gamepad.index);
        break;
      case 15:
        get().arrowRight(e.gamepad.index);
        break;
      case 12:
        get().arrowUp(e.gamepad.index);
        break;
      case 13:
        get().arrowDown(e.gamepad.index);
        break;
      case 0:
        get().symbolDown(e.gamepad.index);
        break;
      default:
        break;
    }
  },
  advanceStage: () =>
    set((state) => ({
      // Testing -> Waiting -> Playing -> Answering -> Scoring -> (Loop to Waiting)
      stage:
        state.stage === GameStage.Testing
          ? GameStage.Waiting
          : state.stage === GameStage.Waiting
          ? GameStage.Playing
          : state.stage === GameStage.Playing
          ? GameStage.Answering
          : state.stage === GameStage.Answering
          ? GameStage.Scoring
          : state.stage === GameStage.Scoring
          ? GameStage.Waiting
          : state.stage,
    })),
  completeQuestion: () =>
    set((state) => ({ questionId: state.questionId + 1 })),
}));

// Temp button array
export const ButtonData = [
  ["Zero", "One", "Two"],
  ["Three", "Four", "Five"],
  ["Six", "Seven", "Eight"],
];
