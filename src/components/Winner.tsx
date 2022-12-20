import useStore from "store";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const Winner = () => {
  const { machineCellsQty, playerCellsQty, playerHasMoves, machineHasMoves, difficulty } = useStore();
  const { width, height } = useWindowSize();

  if (playerHasMoves || machineHasMoves) return null;

  let winner;

  if (machineCellsQty - playerCellsQty === 0) {
    winner = "draw";
  } else if (machineCellsQty - playerCellsQty > 0) {
    winner = "machine";
  } else {
    winner = "you";
  }

  const classes = `${winner === "draw" && "bg-black/40"} ${winner === "machine" && "bg-danger/40"} ${
    winner === "you" && "bg-success/40"
  }`.trim();

  return (
    <>
      {winner === "you" && <Confetti width={width} height={height} />}
      <div
        className={[
          "absolute z-50 top-0 left-0 w-screen h-screen text-dark flex items-center justify-center",
          classes,
        ].join(" ")}
      >
        <div className="bg-light w-64 p-4 rounded-md flex flex-col gap-2 items-center justify-center">
          {winner === "draw" ? (
            <h1>It's a draw</h1>
          ) : (
            <h1>
              Winner: <span className={`${winner === "machine" ? "text-danger" : "text-success"}`}>{winner}</span>
            </h1>
          )}
          <span>Mode: {difficulty}</span>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2 justify-center items-center p-2">
              <span>Machine</span>
              <span className="text-lg">{machineCellsQty}</span>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center p-2">
              <span>You</span>
              <span className="text-lg">{playerCellsQty}</span>
            </div>
          </div>
          <a href="/" className="bg-dark py-2 px-4 rounded-lg text-light">
            Play Again
          </a>
        </div>
      </div>
    </>
  );
};

export default Winner;
