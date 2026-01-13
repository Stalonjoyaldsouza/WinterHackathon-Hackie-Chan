import { HashRouter, Routes, Route } from "react-router-dom";
import StartSession from "./pages/StartSession";
import LiveSession from "./pages/LiveSession";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateGroup from "./pages/CreateGroup";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/start-session/:groupId" element={<StartSession />} />
        <Route path="/live-session" element={<LiveSession />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
