import { useMemo } from "react";
import useStore from "store";
import { OBJECTS, TPosition } from "types";
import { canMove } from "utils";

interface Props {
  value: OBJECTS;
  position: TPosition;
}

const SPRITES: Record<OBJECTS, JSX.Element | null> = {
  [OBJECTS.BLANK]: null,
  [OBJECTS.PLAYER]: <img className="w-full h-full scale-75" src="/player.svg" alt="player" />,
  [OBJECTS.MACHINE]: <img className="w-full h-full scale-75" src="/machine.svg" alt="machine" />,
  [OBJECTS.BONUS]: <img className="w-full h-full scale-75" src="/bonus.svg" alt="bonus" />,
  [OBJECTS.PLAYER_CELL]: null,
  [OBJECTS.MACHINE_CELL]: null,
};

const COLORS: Record<OBJECTS, HTMLDivElement["className"]> = {
  [OBJECTS.BLANK]: "bg-dark",
  [OBJECTS.PLAYER]: "player bg-success border-success",
  [OBJECTS.MACHINE]: "machine bg-danger border-danger",
  [OBJECTS.BONUS]: "bonus bg-dark",
  [OBJECTS.PLAYER_CELL]: "bg-success",
  [OBJECTS.MACHINE_CELL]: "bg-danger",
};

const Cell = ({ value, position }: Props): JSX.Element => {
  const { selected, setSelected, setGame, isMachineTurn } = useStore();

  const handleClick = () => {
    if (isMachineTurn) return;
    if (value === OBJECTS.PLAYER) setSelected(!selected ? position : null);
    if (selected && isValidMove) handleMove();
  };

  const handleMove = () => setGame(selected!, position);

  const isSelected = selected?.x === position.x && selected?.y === position.y;

  const isValidMove = useMemo<boolean>(() => {
    if (!selected) return false;
    const isValidCell = value === OBJECTS.BLANK || value === OBJECTS.BONUS;
    return canMove(selected, position) && isValidCell;
  }, [selected]);

  return (
    <div
      className={`cell position__${position.x}-${position.y} ${isValidMove ? "valid__move" : ""} ${
        isSelected ? "selected" : ""
      } ${COLORS[value]}`}
      onClick={handleClick}
    >
      {SPRITES[value]}
    </div>
  );
};

export default Cell;
