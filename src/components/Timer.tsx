import { useInterval } from "usehooks-ts";
import {
  addHours,
  intervalToDuration,
  formatDuration,
  differenceInSeconds,
} from "date-fns";
import { ko } from "date-fns/locale";

import { useTimerStore } from "@/stores/useTimerStore";
import { Colors } from "@/constants/Colors";

import Button from "@/components/ui/Button";

const INTERVAL_DELAY = 0;

export default function Timer() {
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
      const res = await fetch("http://localhost:8080/work/create", {
        method: "POST",
        mode: "cors",
        // test header
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJleHAiOjE3MTgzODI5NDAsInVzZXJJZCI6MX0.NGm29MNZCGBhRNQpI8bpilEh_n34rWnjaeNUuNDNqHo",
        },
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
        <Button
          isShow={workDoneAt === null}
          label="일을 시작합시다"
          onClick={workStartHandler}
        />
        <Button
          isShow={workDoneAt !== null && isPause === 0}
          label="멈춤"
          color={Colors.warning}
          onClick={pauseHandler}
        />
        <Button
          isShow={workDoneAt !== null && isPause !== 0}
          label="일을 시작합시다"
          color={Colors.secondary}
          onClick={restartHandler}
        />
        <Button label="다시 설정하기" color={Colors.accent} onClick={reset} />
      </div>
    </>
  );
}
