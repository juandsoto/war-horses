function App() {
  return (
    <div className="h-screen w-screen p-4">
      <div className="flex items-center gap-2">
        <img className="logo" src="/logo.png" alt="logo" />
        <h1 className="font-bold text-center">
          War <br /> <span className="text-important">Horses</span>
        </h1>
      </div>
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
  );
}

export default App;
