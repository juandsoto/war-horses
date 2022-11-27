import { OBJECTS, TDifficulty, TPosition } from "types";
import { createGrid } from "utils";
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
      if (currentObject === OBJECTS.PLAYER) {
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
