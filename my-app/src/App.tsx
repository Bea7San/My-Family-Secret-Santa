import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./views/LandingPage";
import { Home } from "./views/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
