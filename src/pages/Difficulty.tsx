import { DifficultyButton, ScreenWrapper } from "components";
import { LEVELS } from "utils";

const Difficulty = (): JSX.Element => {
  return (
    <ScreenWrapper>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col items-center text-2xl gap-4">
          {LEVELS.map(level => (
            <DifficultyButton key={level} text={level} to={`/game?difficulty=${level}`} />
          ))}
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default Difficulty;
