import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Routes/Root";
import ErrorPage from "./components/ErrorPage";
import AuthPage from "./Routes/Auth/AuthPage";
import { Toaster } from "sonner";
import StoreProvider from "./lib/store/StoreProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
    },
    {
        path: "auth",
        element: <AuthPage />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <StoreProvider>
            <Toaster expand={true} closeButton />
            <RouterProvider router={router} />
        </StoreProvider>
    </StrictMode>
);
