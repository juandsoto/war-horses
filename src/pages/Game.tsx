import { Minimax } from "classes";
import { Grid, Logo, ScreenWrapper } from "components";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "store";
import { matrixDeepClone } from "utils";

const Game = (): JSX.Element => {
  const { machineCellsQty, playerCellsQty, game, setGame, difficulty, isMachineTurn } = useStore();
  const navigate = useNavigate();
  const onPlay = () => {
    const minimax = new Minimax();
    const { currentMachine, nextMachine } = minimax.run(matrixDeepClone(game));
    setGame(currentMachine, nextMachine);
  };

  useEffect(() => {
    if (!isMachineTurn) return;
    setTimeout(() => onPlay(), 500);
  }, [isMachineTurn]);

  useEffect(() => {
    if (difficulty.length !== 0) return;

    console.log({ difficulty });

    navigate("/", { replace: true });
  }, []);

  return (
    <ScreenWrapper>
      <div className="game">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Logo />
          <button onClick={onPlay}>play</button>
        </div>
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
