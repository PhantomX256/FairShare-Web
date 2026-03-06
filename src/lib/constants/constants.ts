export const GITHUB_URL: string = "https://github.com/PhantomX256/FairShare";

export const LINKEDIN_URL: string = "https://www.linkedin.com/in/ved-verma-575ba32b2/";

export const DASHBOARD_SIDEBAR_TABS = [
    {
        name: "Dashboard",
        icon: "dashboard",
        link: "/dashboard"
    },
    {
        name: "Groups",
        icon: "groups",
        link: "/groups"
    },
    {
        name: "Friends",
        icon: "people",
        link: "/friends"
    },
    {
        name: "Settings",
        icon: "settings",
        link: "/settings"
    }
]

export const GOOGLE_CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

export const ERROR_SEVERITY = {
    TOAST: "toast",
    LOG: "log",
    FATAL: "fatal"
} as const;

export type ERROR_SEVERITY = typeof ERROR_SEVERITY[keyof typeof ERROR_SEVERITY];