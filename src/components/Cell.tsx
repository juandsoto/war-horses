import { useMemo } from "react";
import useStore from "store";
import { OBJECTS, TPosition } from "types";
import { canMove } from "utils";

interface Props {
  value: OBJECTS;
  position: TPosition;
}

const SPRITES: Record<OBJECTS, JSX.Element | null> = {
  0: null,
  1: <img className="w-full h-full scale-75" src="/player.svg" alt="player" />,
  2: <img className="w-full h-full scale-75" src="/machine.svg" alt="machine" />,
  3: null,
};

const COLORS: Record<OBJECTS, HTMLDivElement["className"]> = {
  0: "bg-dark",
  1: "player bg-success border-success",
  2: "machine bg-danger border-danger",
  3: "bonus bg-dark",
};

const Cell = ({ value, position }: Props): JSX.Element => {
  const { selected, setSelected } = useStore();

  const onSelect = () => {
    if (value !== 1) return;
    setSelected(!selected ? position : null);
  };

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
      onClick={onSelect}
    >
      {SPRITES[value]}
    </div>
  );
};

export default Cell;
