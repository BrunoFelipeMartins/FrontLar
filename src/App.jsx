import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pessoas from "./pages/Pessoas";
import "./app.css";
import "./pages/Home.css";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Pessoas" element={<Pessoas/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App