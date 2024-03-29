import { setNodeDepth } from "main";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { OBJECTS, TDifficulty, TPosition } from "types";
import { DifficultyDepth } from "types/TDifficulty";
import { createGrid, getAdjacentCells, getMoves } from "utils";
import create from "zustand";
import { findPlayer } from "../utils/index";

interface Store {
  difficulty: TDifficulty;
  setDifficulty: (difficulty: TDifficulty) => void;
  game: number[][];
  setGame: (current: TPosition, next: TPosition) => void;
  selected: TPosition | null;
  setSelected: (position: TPosition | null) => void;
  isMachineTurn: boolean;
  setIsMachineTurn: (isTurn: boolean) => void;
  machineHasMoves: boolean;
  playerHasMoves: boolean;
  setPlayerHasMoves: (hasMoves: boolean) => void;
  playerCellsQty: number;
  machineCellsQty: number;
  reset: () => void;
}

const useStore = create<Store>(set => ({
  isMachineTurn: false,
  setIsMachineTurn: isTurn => set(state => ({ ...state, isMachineTurn: isTurn })),
  machineHasMoves: true,
  playerHasMoves: true,
  setPlayerHasMoves: hasMoves => set(state => ({ ...state, playerHasMoves: hasMoves })),
  difficulty: "" as TDifficulty,
  setDifficulty: difficulty => {
    set(state => ({ ...state, difficulty }));
    setNodeDepth(DifficultyDepth[difficulty]);
  },
  game: createGrid(),
  setGame: (current, next) =>
    set(state => {
      const newGame = [...state.game];
      const currentObject = state.game[current.x][current.y];
      let nextObject: number;
      try {
        nextObject = state.game[next.x][next.y];
      } catch (error) {
        return {
          ...state,
          isMachineTurn: false,
          machineHasMoves: false,
        };
      }

      if (currentObject === OBJECTS.PLAYER) {
        if (nextObject === OBJECTS.BONUS) {
          const cellsToPaint: TPosition[] = getAdjacentCells(next).filter(
            ({ x, y }) => newGame[x][y] === OBJECTS.BLANK
          );

          cellsToPaint.forEach(({ x, y }) => {
            newGame[x][y] = OBJECTS.PLAYER_CELL;
          });
          newGame[current.x][current.y] = OBJECTS.PLAYER_CELL;
          newGame[next.x][next.y] = OBJECTS.PLAYER;
          return {
            ...state,
            game: newGame,
            selected: null,
            isMachineTurn: state.machineHasMoves,
            playerCellsQty: state.playerCellsQty + cellsToPaint.length + 1,
          };
        }
        newGame[current.x][current.y] = OBJECTS.PLAYER_CELL;
        newGame[next.x][next.y] = OBJECTS.PLAYER;
        return {
          ...state,
          game: newGame,
          selected: null,
          isMachineTurn: state.machineHasMoves,
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
            isMachineTurn: !state.playerHasMoves,
            machineCellsQty: state.machineCellsQty + cellsToPaint.length + 1,
          };
        }
        newGame[current.x][current.y] = OBJECTS.MACHINE_CELL;
        newGame[next.x][next.y] = OBJECTS.MACHINE;

        const machineBlocksPlayerOnlyMovement =
          getMoves(findPlayer(newGame)).length === 1 &&
          getMoves(findPlayer(newGame))[0].x === next.x &&
          getMoves(findPlayer(newGame))[0].y === next.y;

        if (machineBlocksPlayerOnlyMovement) {
          console.warn("BLOCKS LAST MOVEMENT");
          return {
            ...state,
            game: newGame,
            selected: null,
            isMachineTurn: true,
            playerHasMoves: false,
            machineCellsQty: state.machineCellsQty + 1,
          };
        }

        return {
          ...state,
          game: newGame,
          selected: null,
          isMachineTurn: !state.playerHasMoves,
          machineCellsQty: state.machineCellsQty + 1,
        };
      }
      return state;
    }),
  selected: null,
  setSelected: selected => set(state => ({ ...state, selected })),
  playerCellsQty: 1,
  machineCellsQty: 1,

  reset: () =>
    set(state => ({
      ...state,
      isMachineTurn: false,
      machineHasMoves: true,
      playerHasMoves: true,
      difficulty: "" as TDifficulty,
      game: createGrid(),
      selected: null,
      playerCellsQty: 1,
      machineCellsQty: 1,
    })),
}));

mountStoreDevtool("Store", useStore);

export default useStore;
