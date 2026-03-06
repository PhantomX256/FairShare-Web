import Navbar from "../components/standalone/Hero/Navbar.tsx";
import HeroSection from "../components/standalone/Hero/HeroSection.tsx";
import FeaturesSection from "../components/standalone/Hero/FeaturesSection.tsx";
import HighlightsSection from "../components/standalone/Hero/HighlightsSection.tsx";
import CallToActionSection from "../components/standalone/Hero/CallToActionSection.tsx";
import Footer from "../components/standalone/Hero/Footer.tsx";

function Hero() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background-dark bg-hero-glow">
                <HeroSection />
                <FeaturesSection />
                <HighlightsSection />
                <CallToActionSection />
                <Footer />
            </main>
        </>
    )
}

export default Hero;