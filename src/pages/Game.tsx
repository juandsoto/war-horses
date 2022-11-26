import { Logo, ScreenWrapper } from "components";
import { useSearchParams } from "react-router-dom";

const Game = () => {
  const [queries, setQueries] = useSearchParams();
  const difficulty = queries.get("difficulty");

  return (
    <ScreenWrapper>
      <div className="h-screen w-screen p-4">
        <Logo />
        <ul className="absolute top-4 right-4 bg-gray p-2 rounded-md shadow-light shadow-md">
          <li>Mavel Sterling</li>
          <li>Juan Diego Gil</li>
          <li>Juan David Soto</li>
          <li>Danilo Arevalo</li>
        </ul>
        <div className="text-4xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <span>Coming soon!</span>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default Game;
