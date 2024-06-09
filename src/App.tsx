import { useState } from "react";
import { useInterval } from "usehooks-ts";
import { formatISO, addSeconds } from "date-fns";

const INTERVAL_DELAY = 1000;

function App() {
  const [time, setTime] = useState<Date | null>(null);
  const [isPause, setIsPause] = useState<number | null>(null);

  useInterval(() => {
    setTime((prevState) => {
      if (!prevState) {
        return null;
      }

      return addSeconds(prevState, -1);
    });
  }, isPause);

  const pauseHandler = () => {
    setIsPause(null);
  };

  const workStartHandler = async () => {
    try {
      const res = await fetch("http://localhost:8080/work/start", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          start_at: formatISO(new Date()),
          company_name: "kfc",
        }),
      });

      const data = await res.json();

      setTime(new Date(data.work["start_at"]));
      setIsPause(INTERVAL_DELAY);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <p className="text-red-50">
          {time ? time.toString() : "not start work"}
        </p>
        {isPause !== null ? (
          <button className="btn btn-warning" onClick={pauseHandler}>
            Pause
          </button>
        ) : (
          <button className="btn btn-primary" onClick={workStartHandler}>
            Work Start
          </button>
        )}
      </div>
    </>
  );
}

export default App;
