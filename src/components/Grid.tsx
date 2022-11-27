import { nanoid } from "nanoid";
import useStore from "store";
import Cell from "./Cell";

const Grid = (): JSX.Element => {
  const grid = useStore(state => state.grid);
  return (
    <div className="grid grid-cols-8 gap-1">
      {grid.map((row, x) => row.map((col, y) => <Cell key={nanoid()} value={grid[x][y]} position={{ x, y }} />))}
    </div>
  );
};

export default Grid;
