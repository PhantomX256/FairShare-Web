import {Link} from "react-router-dom";
import AuthCard from "../components/standalone/Auth/AuthCard.tsx";

function Auth() {
    return (
        <main
            className="bg-background-dark font-display min-h-screen flex items-center justify-center relative overflow-hidden">
            <Link to="/">
                <button className=" cursor-pointer glass-card p-2 rounded-xl absolute top-4 left-4 flex items-start justify-center gap-1">
                    <span style={{ fontSize: "20px" }} className="material-symbols-outlined">home</span>
                    <p style={{ fontSize: "15px" }} className="text-gray-400">Back to Home</p>
                </button>
            </Link>
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-[-10%] left-[-10%] w-160 h-160 bg-primary/20 rounded-full blur-[120px] opacity-40 mix-blend-screen"></div>
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-140 h-140 bg-indigo-900/30 rounded-full blur-[100px] opacity-30 mix-blend-screen"></div>
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full animated-gradient opacity-60"></div>
            </div>
            <main className="relative z-10 w-full max-w-md px-6">
                <AuthCard />
            </main>
        </main>
    );
}

export default Auth;