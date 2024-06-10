import { useInterval } from "usehooks-ts";
import {
  addHours,
  intervalToDuration,
  formatDuration,
  differenceInSeconds,
} from "date-fns";
import { ko } from "date-fns/locale";

import { useTimerStore } from "@/stores/useTimerStore";

const INTERVAL_DELAY = 0;

function App() {
  const {
    workDoneAt,
    workPauseAt,
    remainingTimeString,
    isPause,
    setWorkDoneAt,
    addWorkDoneAt,
    setWorkPauseAt,
    setRemainingTimeString,
    setPause,
    reset,
  } = useTimerStore();

  useInterval(() => {
    if (!workDoneAt) {
      return;
    }

    const diff = intervalToDuration({ start: new Date(), end: workDoneAt });

    setRemainingTimeString(formatDuration(diff, { zero: true, locale: ko }));
  }, isPause);

  const pauseHandler = () => {
    setWorkPauseAt(new Date());
    setPause(null);
  };

  const restartHandler = () => {
    if (!workPauseAt) {
      return;
    }

    const diffTime = differenceInSeconds(new Date(), workPauseAt);
    addWorkDoneAt(diffTime);

    setPause(INTERVAL_DELAY);
  };

  const workStartHandler = async () => {
    try {
      const res = await fetch("http://localhost:8080/work/start", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          start_at: new Date().toISOString(),
          company_name: "kfc",
        }),
      });

      const data = await res.json();
      const startAt = data.work["start_at"];

      setWorkDoneAt(addHours(new Date(startAt), 9));
      setPause(INTERVAL_DELAY);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <p className="text-red-50">{remainingTimeString}</p>
        {workDoneAt === null && (
          <button className="btn btn-primary" onClick={workStartHandler}>
            업무 시작
          </button>
        )}
        {workDoneAt && isPause === 0 && (
          <button className="btn btn-warning" onClick={pauseHandler}>
            멈춤
          </button>
        )}
        {workDoneAt && isPause !== 0 && (
          <button className="btn btn-info" onClick={restartHandler}>
            재시작
          </button>
        )}
        <button onClick={reset}>clean</button>
      </div>
    </>
  );
}

export default App;
