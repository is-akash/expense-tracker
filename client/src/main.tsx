import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { AppContext } from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppContext>
            <Toaster expand={true} closeButton />
            <App />
        </AppContext>
    </StrictMode>
);
