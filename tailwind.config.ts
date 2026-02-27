import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#1337ec",
                "background-light": "#f6f6f8",
                "background-dark": "#050505",
                "surface-dark": "#121212",
                glass: "rgba(255, 255, 255, 0.05)",
                "card-dark": "#16161a",
                "border-dark": "#2a2a30",
            },
            fontFamily: {
                display: ["Inter", "sans-serif"],
                sans: ["Inter", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                "2xl": "1rem",
                "3xl": "1.5rem",
                full: "9999px",
            },
            backgroundImage: {
                "hero-glow":
                    "radial-gradient(circle at 50% 0%, rgba(19, 55, 236, 0.15) 0%, rgba(0, 0, 0, 0) 50%)",
            },
        },
    },
    plugins: [],
};

export default config;
