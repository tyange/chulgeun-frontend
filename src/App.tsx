import { formatISO } from "date-fns";

function App() {
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
      console.log(await res.json());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <p className="text-red-50">chulgeun</p>
        <button className="btn" onClick={workStartHandler}>
          Work Start
        </button>
      </div>
    </>
  );
}

export default App;
