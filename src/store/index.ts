import { OBJECTS, TDifficulty, TPosition } from "types";
import { createGrid, getAdjacentCells } from "utils";
import create from "zustand";

interface Store {
  difficulty: TDifficulty;
  setDifficulty: (difficulty: TDifficulty) => void;
  game: number[][];
  setGame: (current: TPosition, next: TPosition) => void;
  selected: TPosition | null;
  setSelected: (position: TPosition | null) => void;
  playerCellsQty: number;
  machineCellsQty: number;
}

const useStore = create<Store>(set => ({
  difficulty: "beginner",
  setDifficulty: difficulty => set(state => ({ ...state, difficulty })),
  game: createGrid(),
  setGame: (current, next) =>
    set(state => {
      const newGame = state.game.map(row => row.map(value => value));
      const currentObject = state.game[current.x][current.y];
      const nextObject = state.game[next.x][next.y];

      if (currentObject === OBJECTS.PLAYER) {
        if (nextObject === OBJECTS.BONUS) {
          newGame[current.x][current.y] = OBJECTS.PLAYER_CELL;
          const cellsToPaint = getAdjacentCells(next).filter(({ x, y }) => newGame[x][y] === OBJECTS.BLANK);

          cellsToPaint.forEach(({ x, y }) => {
            newGame[x][y] = OBJECTS.PLAYER_CELL;
          });
          newGame[next.x][next.y] = OBJECTS.PLAYER;
          return {
            ...state,
            game: newGame,
            selected: null,
            playerCellsQty: state.playerCellsQty + cellsToPaint.length + 1,
          };
        }
        newGame[current.x][current.y] = OBJECTS.PLAYER_CELL;
        newGame[next.x][next.y] = OBJECTS.PLAYER;
        return {
          ...state,
          game: newGame,
          selected: null,
          playerCellsQty: state.playerCellsQty + 1,
        };
      }
      if (currentObject === OBJECTS.MACHINE) {
        if (nextObject === OBJECTS.BONUS) {
          newGame[current.x][current.y] = OBJECTS.MACHINE_CELL;
          const cellsToPaint = getAdjacentCells(next).filter(({ x, y }) => newGame[x][y] === OBJECTS.BLANK);

          cellsToPaint.forEach(({ x, y }) => {
            newGame[x][y] = OBJECTS.MACHINE_CELL;
          });
          newGame[next.x][next.y] = OBJECTS.MACHINE;
          return {
            ...state,
            game: newGame,
            selected: null,
            machineCellsQty: state.machineCellsQty + cellsToPaint.length + 1,
          };
        }
        newGame[current.x][current.y] = OBJECTS.MACHINE_CELL;
        newGame[next.x][next.y] = OBJECTS.MACHINE;
        return {
          ...state,
          game: newGame,
          selected: null,
          machineCellsQty: state.machineCellsQty + 1,
        };
      }
      return state;
    }),
  selected: null,
  setSelected: selected => set(state => ({ ...state, selected })),
  playerCellsQty: 1,
  machineCellsQty: 1,
}));

export default useStore;
