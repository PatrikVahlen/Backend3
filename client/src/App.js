import { Routes, Route } from "react-router-dom";
import './App.css';
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="/user/home" element={<HomePage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
