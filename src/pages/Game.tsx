import { Grid, Logo, ScreenWrapper } from "components";
import { useSearchParams } from "react-router-dom";
import useStore from "store";
import { TDifficulty } from "types";

const Game = (): JSX.Element => {
  const setDifficulty = useStore(state => state.setDifficulty);
  const [queries, setQueries] = useSearchParams();
  setDifficulty(queries.get("difficulty") as TDifficulty);

  return (
    <ScreenWrapper>
      <div className="game">
        <div className="absolute top-4 left-4">
          <Logo />
        </div>
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <Grid />
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default Game;
