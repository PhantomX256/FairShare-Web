import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./lib/constants/constants.ts";
import {
	keepPreviousData,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { AuthProvider } from "./components/provider/AuthProvider.tsx";
import { PopupProvider } from "./components/provider/PopupProvider.tsx";
import { Toaster } from "sonner";
import { minutes } from "./lib/utils/date.utils.ts";

// If in case important environment variables are missing,
// Don't even try to render the app, just log an error to the console.
if (!GOOGLE_CLIENT_ID) {
	console.error("GOOGLE_CLIENT_ID is missing from env");
} else {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: 1,
				staleTime: minutes(5),
				placeholderData: keepPreviousData,
			},
		},
	});

	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
						<AuthProvider>
							<PopupProvider>
								<App />
							</PopupProvider>
						</AuthProvider>
						<Toaster />
					</GoogleOAuthProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</StrictMode>,
	);
}
