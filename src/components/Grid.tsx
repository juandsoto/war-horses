import { nanoid } from "nanoid";
import useStore from "store";
import Cell from "./Cell";

const Grid = (): JSX.Element => {
  const game = useStore(state => state.game);
  return (
    <div className="grid grid-cols-8 gap-1 sm:gap-2">
      {game.map((row, x) => row.map((col, y) => <Cell key={nanoid()} value={game[x][y]} position={{ x, y }} />))}
    </div>
  );
};

export default Grid;
