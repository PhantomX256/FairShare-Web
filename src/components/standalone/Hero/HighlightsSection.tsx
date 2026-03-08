function HighlightsSection() {
    return (
        <section className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">Everything you need</h2>
                <p className="text-gray-400 text-lg">Designed for modern friendships. Powerful features wrapped in a
                    beautiful web interface.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors group">
                    <div
                        className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-2xl">sync</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Real-time Sync</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Changes made by anyone are instantly reflected
                        across all devices. Always see the latest balance, live as it happens.</p>
                </div>
                <div
                    className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors group">
                    <div
                        className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-2xl">call_split</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Easy Splitting</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Split expenses equally, by exact amounts,
                        percentages, or shares. Handle complicated bills with just a few clicks.</p>
                </div>
                <div
                    className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors group">
                    <div
                        className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-2xl">pie_chart</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Visual Analysis</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Visualize your spending habits with clear,
                        interactive charts. Understand your financial dynamics at a glance.</p>
                </div>
                <div
                    className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors group md:col-span-2 lg:col-span-3 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <div
                            className="h-12 w-12 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-2xl">group_work</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Groups for every occasion</h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xl">Whether it's a weekend trip, a
                            shared apartment, or a night out, create custom groups to keep expenses organized. Settle up
                            per group or across all your friendships at once.</p>
                    </div>
                    <div className="w-full md:w-1/3 h-32 md:h-full rounded-xl bg-white/5 overflow-hidden relative">
                        <div className="absolute inset-0 bg-cover bg-center opacity-60"
                             data-alt="Abstract gradient mesh representing group connectivity"
                             style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDY9x2YUwb1Vz6InA9fCGbkIdOEyVskgAWwSZ-VXa2LnfBYHujw21NpJ3W1-cDAT3bK50vuOOaMytG8fSSNyULT8xECGUIDtfW_vgCtMqr0r3mWaX4lObplBMoosD1WbeQDwN3fy-_edtEtuKcGiII4hwqELit_BWyZOjBIXuUaSeraJOIS_aK0M8zTdSuxjcmWzjVrMhC3FuEyEj9TpILGEQ0dcA3UxgNBHXQzK0ptwdAwP-TR4rVI3dQPM4Gj2icg6lZUgny0idk')"}}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HighlightsSection;