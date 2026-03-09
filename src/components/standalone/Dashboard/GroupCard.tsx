function GroupCard() {
    return (
        <div className="glass-card bg-white/3 hover:bg-white/5 border border-white/8 rounded-2xl p-5 hover:border-white/20 transition-all cursor-pointer group">
            <div className="flex justify-between mb-4">
                <div
                    className="size-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 overflow-hidden">
                    <img className="w-full h-full object-cover" data-alt="Modern apartment interior"
                         src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmmQuP9VbKMfO07rQoY8nvXtPWQ1ZgQHLZFpT7ZbSAMEWWb7U5CqT_g4FMoGxVonxZYEzVbKBbY3imHtIqmwI8KNqoBCTkL0pWQRPHxTvjeF4v01cLteS5uxyD2PozE45137AtdWBSAEBdOO5y4LOnLknumDGdv08Quo1vfUUU4iU-hZAHXQpXsu8cu48c_fhbCxX_WdTi96FkVOnJxnCAmO5-xgO2YvTU5Xbak3b6R-5gAZI8T0V7ALKZfLILO3y59Qec-dQ5lpY"/>
                </div>
                <div className="flex -space-x-3">
                    <img className="size-8 rounded-full border-2 border-background-dark object-cover"
                         data-alt="Friend avatar 1"
                         src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRxXNBtdEfadDXEX1RtQ-hyMPaF_vH8cGgTX-CHjMl9J5GEysbYOEBf8jZeqkFZ7VSEqMQwD0Lz980nkMTjnD26AzR82ZguBIuKeIj_tz3FaFcb9EUq8boOPKSIIDO5c9baUlW1kQK_1Gu5XIPP2nGiNp_7aFsf5dWtlTQ4jm3Pvy9zk2ytE96NRkloHnsOQmZQFdjSRlPujwNj0Pb0hePF7efmfuF7OaKEaNYsSSUWUJ2-nRPSo1KoDCLa24wgeoHw2hShiEVD1s"/>
                    <img className="size-8 rounded-full border-2 border-background-dark object-cover"
                         data-alt="Friend avatar 2"
                         src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQnlDkVVOuSpQv9dVv3HxxS_GCdjdEwNsCTT7J5j4jCG27lKjSW-aixNvRRXEnJpp6PLdh9r680L79QnpAe-vYo14n8kcroGNaT4nmEvFmZ9FqNA-kXR6a1HWYRkoMT8Mo-HZwqhjhZUSdJpdRzWX7NUfll4_8neHSY7UracoKJ04Um7at4qGfwZEJvX34UEH-iFW7T-4jA8LS8gWMj0aMMP218eqXLAZeJjITBNF3n9vgfID_JbbrB3lk1Vk9hZQkIvtcCTAkpFM"/>
                    <div
                        className="size-8 rounded-full border-2 border-background-dark bg-slate-800 flex items-center justify-center text-[10px] font-bold">+1
                    </div>
                </div>
            </div>
            <h4 className="font-bold text-lg mb-1">Apartment 4B</h4>
            <div className="flex items-center gap-2 mb-4">
                <span className="size-2 rounded-full bg-red-500"></span>
                <p className="text-sm text-slate-400">You owe <span className="text-slate-100 font-bold">$120.00</span>
                </p>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary w-2/3 h-full rounded-full"></div>
            </div>
        </div>
    );
}

export default GroupCard;