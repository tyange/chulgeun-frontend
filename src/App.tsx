import { useState } from "react";
import { useInterval } from "usehooks-ts";
import {
  addHours,
  intervalToDuration,
  formatDuration,
  differenceInSeconds,
  addSeconds,
} from "date-fns";
import { ko } from "date-fns/locale";

const INTERVAL_DELAY = 0;
const INITIAL_REMAINING_TIME_STRING = "9시간 00분 00초";

function App() {
  const [workPauseAt, setWorkPauseAt] = useState<Date | null>(null);
  const [workDoneAt, setWorkDoneAt] = useState<Date | null>(null);
  const [remainingTimeString, setRemainingTimeString] = useState<string | null>(
    INITIAL_REMAINING_TIME_STRING
  );
  const [isPause, setIsPause] = useState<number | null>(null);

  useInterval(() => {
    if (!workDoneAt) {
      return;
    }

    const diff = intervalToDuration({ start: new Date(), end: workDoneAt });

    setRemainingTimeString(formatDuration(diff, { zero: true, locale: ko }));
  }, isPause);

  const pauseHandler = () => {
    setWorkPauseAt(new Date());
    setIsPause(null);
  };

  const restartHandler = () => {
    if (!workPauseAt) {
      return;
    }

    const diffTime = differenceInSeconds(new Date(), workPauseAt);

    setWorkDoneAt((prevWorkDoneAt) => {
      if (!prevWorkDoneAt) {
        throw new Error("Missing Work done at.");
      }

      return addSeconds(prevWorkDoneAt, diffTime);
    });
    setIsPause(INTERVAL_DELAY);
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
      setIsPause(INTERVAL_DELAY);
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
      </div>
    </>
  );
}

export default App;
