import { useAuth } from "../../../lib/hooks/context.hooks.ts";

function TopNav() {
	const { user } = useAuth();

    return (
        <div className="sticky top-0 z-30 flex items-center justify-between px-8 py-6 bg-background-dark/80 backdrop-blur-md">
            <div>
                <h2 className="text-white text-2xl font-black tracking-tight">Good morning, {user?.full_name.split(' ')[0]}</h2>
                <p className="text-slate-500 text-sm font-medium">Friday, October 24th</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <button
                        className="size-10 rounded-full bg-card-dark flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors border border-white/5">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <span
                        className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
                </div>
                <button
                    className="flex text-white items-center gap-2 px-4 py-2 bg-card-dark rounded-xl border border-white/5 text-sm font-semibold">
                    <span className="material-symbols-outlined text-sm">add</span>
                    New Expense
                </button>
            </div>
        </div>
    )
}

export default TopNav;