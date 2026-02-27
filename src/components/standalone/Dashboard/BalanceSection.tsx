function BalanceSection() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
                className="glass-card rounded-2xl p-8 flex flex-col justify-between group hover:border-red-500/30 transition-all duration-500 premium-shadow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-400 font-semibold text-sm uppercase tracking-wider mb-1">Total Owed</p>
                        <h3 className="text-4xl font-black text-slate-100 tracking-tight">$420.50</h3>
                    </div>
                    <div className="size-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                        <span className="material-symbols-outlined">north_east</span>
                    </div>
                </div>
                <div className="mt-6 flex items-center gap-2">
                    <span className="text-red-500 font-bold text-sm">-5.2%</span>
                    <span className="text-slate-500 text-sm">since last week</span>
                </div>
            </div>
            <div
                className="glass-card rounded-2xl p-8 flex flex-col justify-between group hover:border-emerald-500/30 transition-all duration-500 premium-shadow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-400 font-semibold text-sm uppercase tracking-wider mb-1">Total You are
                            Owed</p>
                        <h3 className="text-4xl font-black text-slate-100 tracking-tight">$1,250.00</h3>
                    </div>
                    <div
                        className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <span className="material-symbols-outlined">south_west</span>
                    </div>
                </div>
                <div className="mt-6 flex items-center gap-2">
                    <span className="text-emerald-500 font-bold text-sm">+12.4%</span>
                    <span className="text-slate-500 text-sm">since last week</span>
                </div>
            </div>
        </section>
    );
}

export default BalanceSection;