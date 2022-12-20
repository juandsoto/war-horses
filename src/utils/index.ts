import { OBJECTS, TDifficulty, TPosition } from "types";

export const LEVELS: TDifficulty[] = ["beginner", "amateur", "expert"];

const players: TPosition[] = [];
let bonuses: TPosition[] = [];
let invalidBonusPositions: TPosition[] = [];

export function createGrid(): number[][] {
  let arr: number[][] = [];
  for (let x = 0; x < 8; x++) {
    arr[x] = [];
    for (let y = 0; y < 8; y++) {
      arr[x].push(0);
    }
  }
  while (true) {
    if (players.length === 2) break;
    const x = Math.floor(Math.random() * 8);
    const y = Math.floor(Math.random() * 8);
    if (!!players.find(pos => pos.x === x && pos.y === y)) continue;
    players.push({ x, y });
    arr[x][y] = players.length;
  }

  while (true) {
    if (bonuses.length === 3) break;
    const x = Math.floor(Math.random() * 8);
    const y = Math.floor(Math.random() * 8);
    getAroundCells({ x, y }).forEach(position => invalidBonusPositions.push(position));
    if (!!players.find(pos => pos.x === x && pos.y === y)) continue;
    if (!!invalidBonusPositions.find(pos => pos.x === x && pos.y === y)) continue;
    bonuses.push({ x, y });
    invalidBonusPositions.push({ x, y });
    arr[x][y] = OBJECTS.BONUS;
  }
  return arr;
}

function getAroundCells({ x, y }: TPosition): TPosition[] {
  const topLeft: TPosition = { x: x - 1, y: y - 1 };
  const topRight: TPosition = { x: x - 1, y: y + 1 };
  const bottomLeft: TPosition = { x: x + 1, y: y - 1 };
  const bottomRight: TPosition = { x: x + 1, y: y + 1 };

  return getAdjacentCells({ x, y }).concat([topLeft, topRight, bottomLeft, bottomRight]);
}

export function getAdjacentCells({ x, y }: TPosition): TPosition[] {
  const left: TPosition = { x, y: y - 1 };
  const right: TPosition = { x, y: y + 1 };
  const top: TPosition = { x: x - 1, y };
  const bottom: TPosition = { x: x + 1, y };

  return [left, top, right, bottom].filter(pos => pos.x >= 0 && pos.y >= 0 && pos.x < 8 && pos.y < 8);
}

export function canMove(player: TPosition, move: TPosition): boolean {
  return !!getMoves(player).find(pos => pos.x === move.x && pos.y === move.y);
}

export function getMoves({ x, y }: TPosition) {
  return [
    {
      x: x - 1,
      y: y + 2,
    },
    {
      x: x + 1,
      y: y + 2,
    },
    {
      x: x + 2,
      y: y + 1,
    },
    {
      x: x + 2,
      y: y - 1,
    },
    {
      x: x + 1,
      y: y - 2,
    },
    {
      x: x - 1,
      y: y - 2,
    },
    {
      x: x - 2,
      y: y - 1,
    },
    {
      x: x - 2,
      y: y + 1,
    },
  ].filter(pos => pos.x >= 0 && pos.y >= 0 && pos.x < 8 && pos.y < 8);
}

export function findMachine(game: number[][]): TPosition {
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (game[x][y] === OBJECTS.MACHINE) return { x, y };
    }
  }
  console.error("Player not found");
  return {} as TPosition;
  // throw new Error("Machine was not found");
}

export function findPlayer(game: number[][]): TPosition {
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (game[x][y] === OBJECTS.PLAYER) return { x, y };
    }
  }
  console.error("Player not found");
  return {} as TPosition;
  // throw new Error("Player was not found");
}

export function matrixDeepClone(matrix: number[][]): number[][] {
  let newMatrix: number[][] = [];
  for (let x in matrix) {
    newMatrix[x] = [];
    for (let y in matrix[x]) {
      newMatrix[x].push(matrix[x][y]);
    }
  }
  return newMatrix;
}
