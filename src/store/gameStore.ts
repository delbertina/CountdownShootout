import { create } from 'zustand';

interface GameState {
  questionId: number;
  completeQuestion: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  questionId: 0,
  completeQuestion: () => set((state) => ({ questionId: state.questionId + 1 })),
}));