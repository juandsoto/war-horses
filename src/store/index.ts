import { TDifficulty, TPosition } from "types";
import { createGrid } from "utils";
import create from "zustand";

interface Store {
  difficulty: TDifficulty;
  setDifficulty: (difficulty: TDifficulty) => void;
  grid: number[][];
  playerCells: TPosition[];
  addPlayerCell: (position: TPosition) => void;
  machineCells: TPosition[];
  addMachineCell: (position: TPosition) => void;
  selected: TPosition | null;
  setSelected: (position: TPosition | null) => void;
}

const useStore = create<Store>(set => ({
  difficulty: "" as TDifficulty,
  setDifficulty: difficulty => set(state => ({ ...state, difficulty })),
  grid: createGrid(),
  playerCells: [],
  machineCells: [],
  addPlayerCell: position => set(state => ({ ...state, playerCells: [...state.playerCells, position] })),
  addMachineCell: position => set(state => ({ ...state, machineCells: [...state.machineCells, position] })),
  selected: null,
  setSelected: selected => set(state => ({ ...state, selected })),
}));

export default useStore;
