import {Link} from "react-router-dom";

function HeroSection() {
    return (
        <section
            className="pt-30 relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <h1 className="max-w-5xl text-5xl font-black tracking-tight sm:text-7xl md:leading-[1.1] mb-6">
                <span className="text-gradient">FairShare: Split the bill,</span><br/>
                <span className="text-gray-500">not the friendship.</span>
            </h1>
            <p className="max-w-xl text-lg text-gray-400 mb-10 leading-relaxed font-light">
                The easiest way to share expenses with roommates and friends.
                Keep track of balances, scan receipts, and settle up in seconds directly from your browser.
            </p>
            <Link to="/auth" className="flex flex-col sm:flex-row items-center gap-4 mb-20">
                <button
                    className="h-12 px-10 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all shadow-lg shadow-white/5 transform hover:scale-105 duration-200">
                    Get Started
                </button>
            </Link>
            <div className="relative w-full max-w-5xl aspect-16/10 mx-auto perspective-[2000px] group">
                <div className="absolute inset-0 -inset-y-20 bg-primary/20 blur-[100px] rounded-full opacity-40"></div>
                <div
                    className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a] transition-transform duration-700 hover:scale-[1.01] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div
                        className="h-8 w-full bg-[#1c1c1e]/80 backdrop-blur-md flex items-center gap-2 px-4 border-b border-white/5 absolute top-0 z-20">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                        </div>
                    </div>
                    <div className="w-full h-full bg-cover bg-center pt-8"
                         data-alt="High fidelity dark mode dashboard interface showing group expenses and charts"
                         style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQl6h9GmAqUOKfH3LAGbutAjOu0VQnyo7oSWgFz0pSqoAbzufHPNJm4Zu4YhqM63o9vaGMR0ZB75mYLzu5GytnfUbVmmY3U7O27MhUM4ZNqwyfKj9_Vpt2Iejg_cz5IJERiPBuWedp6ruSNzLX4i3nTGLh0VM-uvIEp0nVLhkmo9VNWDUTcFDH4rOY2kKEOGzyY-Sf6HTvY5epmrWwh0Pz6Yorp4gv6OTysEPSLQJRIMkiP8fUM9EFMLcpUHfFkjS64Z50pc49ICo')"}}>
                        <div
                            className="absolute inset-0 bg-linear-to-t from-background-dark via-transparent to-transparent opacity-30 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;