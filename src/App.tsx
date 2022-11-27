import { LoadingScreen } from "components";
import { Difficulty, Game } from "pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route
          path=""
          element={
            <LoadingScreen>
              <Difficulty />
            </LoadingScreen>
          }
        />
        <Route path="game" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
