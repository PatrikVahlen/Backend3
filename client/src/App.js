import { Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
