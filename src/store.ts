import { create } from "zustand";
import type { PodcastEpisode } from "./lib/types";

interface PodcastStore {
  currentEpisode: PodcastEpisode | null;
  setCurrentEpisode: (episode: PodcastEpisode) => void;
  updateProgress: (seconds: number) => void;
  markCompleted: () => void;
  clearEpisode: () => void;
}

export const usePodcastStore = create<PodcastStore>((set) => ({
  currentEpisode: null,
  setCurrentEpisode: (episode) => set({ currentEpisode: episode }),
  updateProgress: (seconds) =>
    set((state) => ({
      currentEpisode: state.currentEpisode
        ? {
            ...state.currentEpisode,
            secondsPlayed: seconds,
          }
        : null,
    })),
  markCompleted: () =>
    set((state) => ({
      currentEpisode: state.currentEpisode
        ? {
            ...state.currentEpisode,
            completed: true,
          }
        : null,
    })),
  clearEpisode: () => set({ currentEpisode: null }),
}));
