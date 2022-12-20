import { nodeDepth } from "main";
import { TPosition } from "types";
import { findMachine, getMoves } from "utils";
import Node from "./Node";

class Minimax {
  expandedNodes: Array<Node> = [];

  run(initialGame: number[][]): { currentMachine: TPosition; nextMachine: TPosition } {
    const machinePosition = findMachine(initialGame);
    const nodesToExpand: Node[] = [];
    let currentMachine: TPosition = { x: machinePosition.x, y: machinePosition.y };
    const root = new Node(currentMachine, null, initialGame);
    nodesToExpand.unshift(root);
    while (nodesToExpand.length) {
      const expanded = nodesToExpand.shift()!;
      const possibleMoves = getMoves(expanded.getPosition());
      possibleMoves.forEach(move => {
        if (expanded.canMove(move)) {
          const node = new Node(move, expanded);
          if (node.getDepth() < nodeDepth + 1) {
            nodesToExpand.unshift(node);
          }
        }
      });
      this.expandedNodes.push(expanded);
    }

    for (let depth = nodeDepth - 1; depth >= 0; depth--) {
      this.expandedNodes.filter(node => node.getDepth() === depth).forEach(node => node.buildUtility());
    }

    console.log({ expanded: this.expandedNodes });
    return {
      currentMachine: machinePosition,
      nextMachine: this.expandedNodes[0].getBestChoice(),
    };
  }
}

export default Minimax;
