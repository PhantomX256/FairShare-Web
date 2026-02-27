import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero.tsx";
import Auth from "./pages/Auth.tsx";
import "./styles/global.css";
import Dashboard from "./pages/Dashboard.tsx";
import Sidebar from "./components/shared/Sidebar.tsx";
import Friends from "./pages/Friends.tsx";
import Groups from "./pages/Groups.tsx";
import Settings from "./pages/Settings.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/auth" element={<Auth />} />
            <Route element={<Sidebar />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
        </Routes>
    )
}

export default App;