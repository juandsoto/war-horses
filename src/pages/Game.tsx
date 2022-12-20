import { Minimax } from "classes";
import { Grid, Logo, ScreenWrapper, Winner } from "components";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "store";
import { matrixDeepClone } from "utils";
import { FADE_VARIANTS } from "utils/motion";

const Game = (): JSX.Element => {
  const {
    machineCellsQty,
    playerCellsQty,
    game,
    setGame,
    difficulty,
    isMachineTurn,
    machineHasMoves,
    setIsMachineTurn,
    playerHasMoves,
  } = useStore();
  const navigate = useNavigate();
  const onPlay = () => {
    const minimax = new Minimax();
    const { currentMachine, nextMachine } = minimax.run(matrixDeepClone(game));
    setGame(currentMachine, nextMachine);
  };

  useEffect(() => {
    if (!isMachineTurn) return;
    let interval: number = 0;
    let timeout: number;
    if (!playerHasMoves && machineHasMoves) {
      interval = setInterval(() => onPlay(), 500);
    }
    if (!playerHasMoves && !machineHasMoves) {
      clearInterval(interval);
    }
    if (playerHasMoves) {
      timeout = setTimeout(() => onPlay(), 500);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isMachineTurn, playerHasMoves, machineHasMoves]);

  useEffect(() => {
    if (!difficulty.length) {
      navigate("/", { replace: true });
      return;
    }
    setTimeout(() => setIsMachineTurn(true), 500);
  }, []);

  return (
    <ScreenWrapper>
      <Winner />
      <div className="game">
        <div className="absolute top-4 left-4">
          <Logo />
        </div>
        <motion.div
          className="absolute right-4 top-4 min-h-[5rem] flex flex-col gap-1 items-center justify-center py-1 px-4 text-dark rounded-md"
          variants={FADE_VARIANTS}
          initial="hidden"
          animate={{ opacity: 1, transition: { duration: 0.7, delay: 0.5 } }}
        >
          <span className="text-light text-sm lg:text-lg sm:bg-light sm:text-dark px-1 rounded-md">Playing</span>
          {isMachineTurn ? (
            <div className="cell p-1 bg-danger border-danger shadow shadow-dark drop-shadow-md">
              <img className="w-full h-full" src="machine.svg" alt="machine" />
            </div>
          ) : (
            <div className="cell p-1 bg-success border-success shadow shadow-dark drop-shadow-md">
              <img className="w-full h-full" src="player.svg" alt="machine" />
            </div>
          )}
        </motion.div>
        <motion.div className="absolute bottom-6 left-4 bg-primary text-dark py-1 px-2 rounded-md text-xl font-bold uppercase">
          {difficulty}
        </motion.div>
        <Grid />
        <div className="absolute bottom-0 right-0 flex gap-4">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.4, type: "spring", stiffness: 150 } }}
            className="machine-blob"
          >
            {machineCellsQty}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.4, type: "spring", stiffness: 150 } }}
            className="player-blob"
          >
            {playerCellsQty}
          </motion.div>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default Game;
