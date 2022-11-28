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
    getAdjacentCells({ x, y }).forEach(position => invalidBonusPositions.push(position));
    if (!!players.find(pos => pos.x === x && pos.y === y)) continue;
    if (!!invalidBonusPositions.find(pos => pos.x === x && pos.y === y)) continue;
    bonuses.push({ x, y });
    invalidBonusPositions.push({ x, y });
    arr[x][y] = OBJECTS.BONUS;
  }
  return arr;
}

export function getAdjacentCells({ x, y }: TPosition): TPosition[] {
  const left: TPosition = { x, y: y - 1 };
  const right: TPosition = { x, y: y + 1 };
  const top: TPosition = { x: x - 1, y };
  const bottom: TPosition = { x: x + 1, y };

  return [left, top, right, bottom];
}

export function canMove(player: TPosition, move: TPosition): boolean {
  return !!getMoves(player).find(pos => pos.x === move.x && pos.y === move.y);
}

function getMoves({ x, y }: TPosition) {
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
  ].filter(pos => pos.x >= 0 && pos.y >= 0 && pos.x <= 8 && pos.y <= 8);
}
