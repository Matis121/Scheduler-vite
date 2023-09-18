import "./App.css";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
