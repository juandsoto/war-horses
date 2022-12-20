import { nodeDepth } from "main";
import { OBJECTS, TPosition } from "types";
import { findMachine, findPlayer, getAdjacentCells, getMoves, matrixDeepClone } from "utils";

type NodeType = "MAX" | "MIN";

class Node {
  private _position: TPosition;
  private _father: Node | null = null;
  private _type: NodeType = "MAX";
  private _depth: number = 0;
  private _utility: number = -Infinity;
  private _game: number[][];
  private _children: Node[] = [];

  constructor(position: TPosition, father: Node | null = null, game: number[][] = [[]]) {
    this._position = position;
    if (!father) {
      this._game = [...game];
      return;
    }
    this._father = father;
    this._type = this._father._type === "MAX" ? "MIN" : "MAX";
    this._depth = this._father._depth + 1;
    this._utility = this._type === "MAX" ? -Infinity : Infinity;
    this._game = matrixDeepClone(this._father._game);
    const isBonus = this.isBonus();
    this._game[this._father._position.x][this._father._position.y] = this.isMachineMove()
      ? OBJECTS.MACHINE_CELL
      : OBJECTS.PLAYER_CELL;

    if (isBonus) {
      getAdjacentCells(this._position).forEach(({ x, y }) => {
        if (this._game[x][y] === OBJECTS.BLANK) {
          this._game[x][y] = this.isMachineMove() ? OBJECTS.MACHINE_CELL : OBJECTS.PLAYER_CELL;
        }
      });
    }

    if (this.canMove(position)) {
      this._game[position.x][position.y] = this.isMachineMove() ? OBJECTS.MACHINE : OBJECTS.PLAYER;
    }
    if (this._type === "MIN") {
      const playerPosition = findPlayer(this._game);
      const possibleMoves = getMoves(playerPosition);
      const isFinalMove = !possibleMoves.some(move => this.canMove(move));

      if (!isFinalMove) {
        this.setPosition(playerPosition);
      }
    } else {
      this.setPosition(findMachine(this._game));
    }
    if (this._depth === nodeDepth) {
      this.setUtility(this.getHeuristic());
    }
    this._father.addChild(this);
  }

  addChild(child: Node) {
    this._children.push(child);
  }

  getHeuristic(): number {
    let machineQty = 0;
    let playerQty = 0;
    for (let x in this._game) {
      for (let y in this._game[x]) {
        this._game[x][y] === OBJECTS.MACHINE_CELL && machineQty++;
        this._game[x][y] === OBJECTS.PLAYER_CELL && playerQty++;
      }
    }
    return machineQty - playerQty;
  }

  buildUtility(): void {
    const childrenUtilities = this._children.map(node => node._utility);
    let utility: number;
    if (!childrenUtilities.length) {
      utility = 0;
      this.setUtility(utility);
      return;
    }
    if (this._type === "MAX") {
      utility = Math.max(...childrenUtilities);
    } else {
      utility = Math.min(...childrenUtilities);
    }
    this.setUtility(utility);
  }

  isMachineMove(): boolean {
    return (
      this._game[this._father!._position.x][this._father!._position.y] === OBJECTS.MACHINE ||
      this._game[this._father!._position.x][this._father!._position.y] === OBJECTS.MACHINE_CELL
    );
  }

  isBonus(): boolean {
    return this._game[this._position.x][this._position.y] === OBJECTS.BONUS;
  }

  isMin(): boolean {
    return this._type === "MIN";
  }

  canMove(next: TPosition): boolean {
    return this._game[next.x][next.y] === OBJECTS.BLANK || this._game[next.x][next.y] === OBJECTS.BONUS;
  }

  setUtility(utility: number) {
    this._utility = utility;
  }

  setPosition(position: TPosition) {
    this._position = position;
  }

  getPosition() {
    return this._position;
  }

  getFather() {
    return this._father;
  }

  getType() {
    return this._type;
  }

  getDepth() {
    return this._depth;
  }

  getUtility() {
    return this._utility;
  }

  getGame() {
    return this._game;
  }

  getChildren() {
    return this._children;
  }

  getBestChoice(): TPosition {
    let position = {} as TPosition;
    try {
      position = this._children
        .find(node => node._utility === this._utility)!
        ._children.find(node => node._utility === this._utility)!._position;
    } catch (error) {
      try {
        console.log({ position });

        position = this._children.find(node => node._utility === this._utility)!._position;
      } catch (err) {
        console.error("Machine has no movements left!");
      }
      return position;
    }
    return position;
  }
}

export default Node;
