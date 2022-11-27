import { Link } from "react-router-dom";
import useStore from "store";
import { TDifficulty } from "types";

interface Props {
  text: string;
  to: string;
}

const DifficultyButton = ({ text, to }: Props): JSX.Element => {
  const setDifficulty = useStore(state => state.setDifficulty);
  const onClick = () => setDifficulty(text as TDifficulty);
  return (
    <Link
      onClick={onClick}
      to={to}
      className="text-primary rounded-lg hover:text-light hover:bg-primary transition-colors uppercase px-8 py-4 max-w-fit"
    >
      {text}
    </Link>
  );
};

export default DifficultyButton;
