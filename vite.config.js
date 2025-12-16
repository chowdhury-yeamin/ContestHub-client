import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          const parts = id.split("node_modules/")[1].split("/");
          const pkg = parts[0].startsWith("@")
            ? `${parts[0]}/${parts[1]}`
            : parts[0];
          return `vendor-${pkg.replace("@", "").replace("/", "-")}`;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
