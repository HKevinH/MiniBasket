import { create } from "zustand";

export default create((set) => ({
  score: 0,
  increment: () => set((state) => ({ score: state.score + 1 })),
  decrement: () => set((state) => ({ score: state.score - 1 })),
  reset: () => set({ score: 0 }),

  isButtonPressed: false,
  setButtonPressed: (isPressed) => set({ isButtonPressed: isPressed }),
}));
