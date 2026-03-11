import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./lib/constants/constants.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./components/provider/ToastProvider.tsx";
import Toast from "./components/shared/Toast.tsx";
import { AuthProvider } from "./components/provider/AuthProvider.tsx";
import { PopupProvider } from "./components/provider/PopupProvider.tsx";
import UserProfilePopup from "./components/shared/UserProfilePopup.tsx";

// If in case important environment variables are missing,
// Don't even try to render the app, just log an error to the console.
if (!GOOGLE_CLIENT_ID) {
	console.error("GOOGLE_CLIENT_ID is missing from env");
} else {
	const queryClient = new QueryClient();

	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
						<ToastProvider>
							<AuthProvider>
								<PopupProvider>
									<App />
									<UserProfilePopup />
								</PopupProvider>
							</AuthProvider>
							<Toast />
						</ToastProvider>
					</GoogleOAuthProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</StrictMode>,
	);
}
