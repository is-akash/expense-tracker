import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    console.log(mode);
    const env = loadEnv("all", process.cwd());
    const serverUrl = `${env.VITE_SERVER_URL}`;
    return {
        plugins: [react()],
        server: {
            proxy: {
                "/api": {
                    target: serverUrl,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                    // rewrite: (path) => path.replace('/^api/', ''),
                },
            },
        },
    };
});
