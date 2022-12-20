import { nodeDepth, setNodeDepth } from "main";
import { OBJECTS, TDifficulty, TPosition } from "types";
import { DifficultyDepth } from "types/TDifficulty";
import { createGrid, getAdjacentCells } from "utils";
import create from "zustand";

interface Store {
  difficulty: TDifficulty;
  setDifficulty: (difficulty: TDifficulty) => void;
  game: number[][];
  setGame: (current: TPosition, next: TPosition) => void;
  selected: TPosition | null;
  setSelected: (position: TPosition | null) => void;
  isMachineTurn: boolean;
  playerCellsQty: number;
  machineCellsQty: number;
}

const useStore = create<Store>(set => ({
  isMachineTurn: false,
  difficulty: "expert" as TDifficulty,
  setDifficulty: difficulty => {
    set(state => ({ ...state, difficulty }));
    setNodeDepth(DifficultyDepth[difficulty]);
  },
  game: createGrid(),
  setGame: (current, next) =>
    set(state => {
      const newGame = [...state.game];
      const currentObject = state.game[current.x][current.y];
      const nextObject = state.game[next.x][next.y];

      if (currentObject === OBJECTS.PLAYER) {
        if (nextObject === OBJECTS.BONUS) {
          const cellsToPaint = getAdjacentCells(next).filter(({ x, y }) => newGame[x][y] === OBJECTS.BLANK);

          cellsToPaint.forEach(({ x, y }) => {
            newGame[x][y] = OBJECTS.PLAYER_CELL;
          });
          newGame[current.x][current.y] = OBJECTS.PLAYER_CELL;
          newGame[next.x][next.y] = OBJECTS.PLAYER;
          return {
            ...state,
            game: newGame,
            selected: null,
            isMachineTurn: true,
            playerCellsQty: state.playerCellsQty + cellsToPaint.length + 1,
          };
        }
        newGame[current.x][current.y] = OBJECTS.PLAYER_CELL;
        newGame[next.x][next.y] = OBJECTS.PLAYER;
        return {
          ...state,
          game: newGame,
          selected: null,
          isMachineTurn: true,
          playerCellsQty: state.playerCellsQty + 1,
        };
      }
      if (currentObject === OBJECTS.MACHINE) {
        if (nextObject === OBJECTS.BONUS) {
          const cellsToPaint = getAdjacentCells(next).filter(({ x, y }) => newGame[x][y] === OBJECTS.BLANK);

          cellsToPaint.forEach(({ x, y }) => {
            newGame[x][y] = OBJECTS.MACHINE_CELL;
          });
          newGame[current.x][current.y] = OBJECTS.MACHINE_CELL;
          newGame[next.x][next.y] = OBJECTS.MACHINE;
          return {
            ...state,
            game: newGame,
            selected: null,
            isMachineTurn: false,
            machineCellsQty: state.machineCellsQty + cellsToPaint.length + 1,
          };
        }
        newGame[current.x][current.y] = OBJECTS.MACHINE_CELL;
        newGame[next.x][next.y] = OBJECTS.MACHINE;
        return {
          ...state,
          game: newGame,
          selected: null,
          isMachineTurn: false,
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
