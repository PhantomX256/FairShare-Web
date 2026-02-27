import {Link} from "react-router-dom";

function CallToActionSection() {
    return (
        <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-white">Ready to settle up?</h2>
            <Link to="/auth">
                <button
                    className="bg-white text-black text-lg font-bold py-4 px-10 rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                    Start for free
                </button>
            </Link>
            <p className="mt-6 text-sm text-gray-500">No credit card required. Purely web-based experience.</p>
        </section>
    );
}

export default CallToActionSection;