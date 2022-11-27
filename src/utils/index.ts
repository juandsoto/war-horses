import { TDifficulty, TPosition } from "types";

export const LEVELS: TDifficulty[] = ["beginner", "amateur", "expert"];

const alreadyUsed: TPosition[] = [];
export function createGrid(): number[][] {
  let arr: number[][] = [];
  for (let x = 0; x < 8; x++) {
    arr[x] = [];
    for (let y = 0; y < 8; y++) {
      arr[x].push(0);
    }
  }
  while (true) {
    if (alreadyUsed.length === 2) break;
    const x = Math.floor(Math.random() * 8);
    const y = Math.floor(Math.random() * 8);
    if (!!alreadyUsed.find(pos => pos.x === x && pos.y === y)) continue;
    alreadyUsed.push({ x, y });
    arr[x][y] = alreadyUsed.length;
  }
  return arr;
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
