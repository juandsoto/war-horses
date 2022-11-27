import { Link } from "react-router-dom";

interface Props {
  text: string;
  to: string;
}

const DifficultyButton = ({ text, to }: Props): JSX.Element => {
  return (
    <Link
      to={to}
      className="text-primary rounded-lg hover:text-light hover:bg-primary transition-colors uppercase px-8 py-4 max-w-fit"
    >
      {text}
    </Link>
  );
};

export default DifficultyButton;
