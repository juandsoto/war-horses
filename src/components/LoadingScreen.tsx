import { useEffect, useState } from "react";
import Logo from "./Logo";
import ScreenWrapper from "./ScreenWrapper";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const LoadingScreen = ({ children }: Props): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(id);
  }, []);

  if (!loading) return <>{children}</>;

  return (
    <ScreenWrapper>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-150">
        <Logo animate />
      </div>
    </ScreenWrapper>
  );
};

export default LoadingScreen;
