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
  public playerHasMoves: boolean = true;

  constructor(position: TPosition, father: Node | null = null, game: number[][] = [[]]) {
    this._position = position;
    if (!father) {
      this._game = [...game];
      return;
    }
    this._father = father;
    this.playerHasMoves = this._father.playerHasMoves;
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
    if (this.isMin()) {
      const playerPosition = findPlayer(this._game);
      const possibleMoves = getMoves(playerPosition);
      const isFinalMove = !possibleMoves.some(move => this.canMove(move));
      if (isFinalMove) {
        this.playerHasMoves = false;
      } else {
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
    let machine = 0;
    let player = 0;
    let machineCells = 0;
    let playerCells = 0;
    let machinePosition: TPosition = {} as TPosition;
    let playerPosition: TPosition = {} as TPosition;
    for (let x in this._game) {
      for (let y in this._game[x]) {
        if (this._game[x][y] === OBJECTS.MACHINE) {
          machinePosition = { x: parseInt(x), y: parseInt(y) };
          continue;
        }
        if (this._game[x][y] === OBJECTS.PLAYER) {
          playerPosition = { x: parseInt(x), y: parseInt(y) };
          continue;
        }
        this._game[x][y] === OBJECTS.MACHINE_CELL && machineCells++;
        this._game[x][y] === OBJECTS.PLAYER_CELL && playerCells++;
      }
    }
    machine += machineCells;
    player += playerCells;

    machine += getMoves(machinePosition).filter(move => this.canMove(move)).length;
    player += getMoves(playerPosition).filter(move => this.canMove(move)).length;

    if (this.isBonus()) {
      if (this.isMin()) {
        machine += 5;
      } else {
        player += 5;
      }
    }

    return machine - player;
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
    let position = { x: -1, y: -1 };
    const childNode = this._children.find(node => node._utility === this._utility);
    if (!childNode?.playerHasMoves) {
      try {
        position = childNode!._position;
      } catch (err) {
        console.error("Machine has no movements left!");
      }
      return position;
    }

    try {
      position = childNode!._children.find(node => node._utility === this._utility)!._position;
    } catch (error) {
      try {
        position = childNode._position;
      } catch (err) {
        console.error("Machine has no movements left!");
      }
      return position;
    }
    return position;
  }
}

export default Node;
