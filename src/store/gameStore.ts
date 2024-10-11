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
  resetButtonSelection: () => void;
  moveButtonSelectionRight: () => void;
  moveButtonSelectionLeft: () => void;
  moveButtonSelectionUp: () => void;
  moveButtonSelectionDown: () => void;
  gamepadButtonDown: (e: { gamepad: Gamepad; button: number }) => void;
  completeQuestion: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  questionId: 0,
  stage: GameStage.Testing,
  tempButtonCol: 1,
  tempButtonRow: 1,
  resetButtonSelection: () => set({ tempButtonCol: 1, tempButtonRow: 1 }),
  moveButtonSelectionRight: () =>
    set((state) => ({
      tempButtonCol:
        state.tempButtonCol === ButtonData[0].length - 1
          ? ButtonData[0].length - 1
          : state.tempButtonCol + 1,
    })),
  moveButtonSelectionLeft: () =>
    set((state) => ({
      tempButtonCol: state.tempButtonCol === 0 ? 0 : state.tempButtonCol - 1,
    })),
  moveButtonSelectionUp: () =>
    set((state) => ({
      tempButtonRow: state.tempButtonRow === 0 ? 0 : state.tempButtonRow - 1,
    })),
  moveButtonSelectionDown: () =>
    set((state) => ({
      tempButtonRow:
        state.tempButtonRow === ButtonData.length - 1
          ? ButtonData.length - 1
          : state.tempButtonRow + 1,
    })),
  gamepadButtonDown: (e: { gamepad: Gamepad; button: number }) => {
    const newEvent = `Gamepad button down at index ${e.gamepad.index}: ${e.gamepad.id}. Button: ${e.button}.`;
    console.log(newEvent);
    switch (e.button) {
      case 14:
        get().moveButtonSelectionLeft();
        break;
      case 15:
        get().moveButtonSelectionRight();
        break;
      case 12:
        get().moveButtonSelectionUp();
        break;
      case 13:
        get().moveButtonSelectionDown();
        break;
      case 0:
        get().resetButtonSelection();
        break;
      default:
        break;
    }
  },
  completeQuestion: () =>
    set((state) => ({ questionId: state.questionId + 1 })),
}));

// Temp button array
export const ButtonData = [
  ["Zero", "One", "Two"],
  ["Three", "Four", "Five"],
  ["Six", "Seven", "Eight"],
];
