function RecentActivitySection() {
    return (
        <section className="pt-4 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <button className="text-primary text-sm font-bold hover:underline">View All History</button>
            </div>
            <div className="space-y-3">
                <div
                    className="glass-card bg-white/3 border border-white/8 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/5 transition-all cursor-pointer">
                    <div className="size-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-100">
                        <span className="material-symbols-outlined">bolt</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold">Electricity Bill</p>
                        <p className="text-xs text-slate-500">You added to <span
                            className="font-semibold text-slate-300">Apartment 4B</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-emerald-500">$85.20</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Yesterday</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RecentActivitySection;