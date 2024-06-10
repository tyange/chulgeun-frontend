import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addSeconds } from "date-fns";

const INITIAL_REMAINING_TIME_STRING = "9시간 00분 00초";

interface TimerState {
  workDoneAt: Date | null;
  setWorkDoneAt: (startAt: Date) => void;
  addWorkDoneAt: (diffTime: number) => void;
  workPauseAt: Date | null;
  setWorkPauseAt: (startAt: Date) => void;
  remainingTimeString: string;
  setRemainingTimeString: (timeString: string) => void;
  isPause: number | null;
  setPause: (pause: number | null) => void;
  reset: () => void;
}

const initialState = {
  workDoneAt: null,
  workPauseAt: null,
  remainingTimeString: INITIAL_REMAINING_TIME_STRING,
  isPause: null,
};

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      workDoneAt: null,
      setWorkDoneAt: (startAt: Date) => set({ workDoneAt: startAt }),
      addWorkDoneAt: (diffTime: number) => {
        const prevWorkDoneAt = get().workDoneAt;

        if (!prevWorkDoneAt) {
          return;
        }
        return set({ workDoneAt: addSeconds(prevWorkDoneAt, diffTime) });
      },
      workPauseAt: null,
      setWorkPauseAt: (pauseAt: Date) => set({ workPauseAt: pauseAt }),
      remainingTimeString: INITIAL_REMAINING_TIME_STRING,
      setRemainingTimeString: (timeString: string) =>
        set({ remainingTimeString: timeString }),
      isPause: null,
      setPause: (pause: number | null) => set({ isPause: pause }),
      reset: () => set(initialState),
    }),
    { name: "timer-storage" }
  )
);
