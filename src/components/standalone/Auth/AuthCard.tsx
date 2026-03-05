import {GoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {BACKEND_URL} from "../../../lib/constants/constants.ts";
import {redirect} from "react-router-dom";

function AuthCard() {
    return (
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="mb-8">
                <div
                    className="w-16 h-16 bg-linear-to-tr from-primary to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 mb-4 mx-auto">
                    <span className="material-symbols-outlined" style={{ fontSize: "30px" }}>balance</span>
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Get started with
                    FairShare</h1>
                <p className="text-gray-400 text-sm font-medium">Sign in or create an account with Google to
                    start
                    splitting.</p>
            </div>
            <div className="w-full flex-row items-center justify-center space-y-6">
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        await axios.post(`${BACKEND_URL}/api/auth/google`, { credential: credentialResponse.credential });
                        redirect("/dashboard");
                    }}
                    width="300"
                />
                <div className="relative flex py-1 items-center">
                    <div className="grow border-t border-white/10"></div>
                    <span
                        className="shrink-0 mx-4 text-xs text-gray-500 font-medium uppercase tracking-wider">Secure Access</span>
                    <div className="grow border-t border-white/10"></div>
                </div>
                <p className="text-gray-400 text-sm">
                    One-tap access to your expenses. <br className="hidden sm:block"/>No passwords to remember.
                </p>
            </div>
        </div>
    );
}

export default AuthCard;