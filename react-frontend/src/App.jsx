import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import NavBar from "./components/NavBar";
import Create from "./page/Create";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
