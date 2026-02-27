import {DASHBOARD_SIDEBAR_TABS} from "../../lib/constants/constants.ts";
import {Link, Outlet, useLocation} from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    return (
        <div className="bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen flex overflow-hidden">
            <aside className="w-72 glass-sidebar h-screen flex flex-col p-6 lg:flex shrink-0">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div
                        className="size-10 bg-primary rounded-xl flex items-center justify-center text-white premium-shadow">
                        <span className="material-symbols-outlined text-2xl font-bold">balance</span>
                    </div>
                    <div>
                        <h1 className="text-xl text-white font-extrabold tracking-tight">FairShare</h1>
                        <p className="text-xs text-slate-500 font-medium">Split Smarter</p>
                    </div>
                </div>
                <nav className="space-y-2 flex-1">
                    {DASHBOARD_SIDEBAR_TABS.map((tab) => (
                        <Link
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${location.pathname === tab.link ? "bg-primary/10 text-primary" : "text-slate-400 hover:text-slate-100 hover:bg-white/5"}  font-semibold transition-all`}
                            to={tab.link} key={tab.name}>
                            <span className="material-symbols-outlined">{tab.icon}</span>
                            <span>{tab.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto pt-6 space-y-4">
                    <button
                        className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all premium-shadow group">
                    <span
                        className="material-symbols-outlined group-hover:rotate-12 transition-transform">qr_code_scanner</span>
                        Scan Receipt
                    </button>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3">
                            <img className="size-10 rounded-full border border-white/10 object-cover"
                                 data-alt="User profile avatar of Alex"
                                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA2AyVYknpQ734SvReAi5b6PLph5Z1DKeTE-XQ-T8f0hAKcTI6CWD9pWP5MbCBdUvCxL8JIDrWIKt7eRt4a7eT4tBntt_u40aQaRBFh9qLpedsUKN3DL7zXbvvOLXLoCcjpTkMaeVNU5FVirdHb1xTWu0fwEgZors3yXlii7HAEnjBuNuv-AkeKHgNAItkmsgzobEo3jc7DZGtQzf-RJj-kGsT67X5Kux_cu7oAX5j8BV_H1qeF2qSeAWuQXeBXBOZRu7xY4DKC_Q"/>
                            <div className="overflow-hidden">
                                <p className="text-white text-sm font-bold truncate">Alex Richards</p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="cursor-pointer w-full bg-red-500/20 hover:bg-red-500 text-red-500/20 hover:text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all premium-shadow group">
                    <span
                        className="material-symbols-outlined transition-transform">logout</span>
                        Logout
                    </button>
                </div>
            </aside>
            <Outlet />
        </div>
    );
}

export default Sidebar;