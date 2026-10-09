import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/media-recommendation-board/",
    build: { sourcemap: false },
    plugins: [react()],
});