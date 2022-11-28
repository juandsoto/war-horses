interface Props {
  animate?: boolean;
}

const Logo = ({ animate = false }: Props): JSX.Element => {
  return (
    <div className={`flex items-center gap-2 ${animate ? "animate-scale" : ""}`}>
      <img className="logo" src="/logo.png" alt="logo" />
      <h1 className="font-bold text-center">
        War <br /> <span className="text-lg sm:text-2xl text-important">Horses</span>
      </h1>
    </div>
  );
};

export default Logo;
