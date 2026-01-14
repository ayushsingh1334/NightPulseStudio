import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from "./pages/home";
import Games from "./pages/Games";
import Tournaments from "./pages/Tournaments";
import Highlights from "./pages/Highlights";
import Join from "./pages/Join";
import ChessGame from "./games/ChessGame";
import SecureAndFairGaming from "./pages/SecureAndFairGaming";

function App() {
  return (
    <Router basename="/NightPulseStudio">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/highlights" element={<Highlights />} />
        <Route path="/join" element={<Join />} />
        <Route path="/chess" element={<ChessGame />} />
        <Route path="/secure-fair-gaming" element={<SecureAndFairGaming />} />
      </Routes>
    </Router>
  );
}

export default App;
