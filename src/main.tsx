import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx'
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./lib/constants/constants.ts";

// If in case important environment variables are missing,
// Don't even try to render the app, just log an error to the console.
if (!GOOGLE_CLIENT_ID) {
    console.error("GOOGLE_CLIENT_ID is missing from env");
} else {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <BrowserRouter>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <App/>
                </GoogleOAuthProvider>
            </BrowserRouter>
        </StrictMode>
    )
}
