import { Grid, Logo, ScreenWrapper } from "components";
import { motion } from "framer-motion";
import useStore from "store";

const Game = (): JSX.Element => {
  const { machineCellsQty, playerCellsQty } = useStore();

  return (
    <ScreenWrapper>
      <div className="game">
        <div className="absolute top-4 left-4">
          <Logo />
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
