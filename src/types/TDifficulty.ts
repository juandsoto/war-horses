type TDifficulty = "beginner" | "amateur" | "expert";

export const DifficultyDepth: Record<TDifficulty, number> = {
  amateur: 2,
  beginner: 4,
  expert: 6,
};

export default TDifficulty;
