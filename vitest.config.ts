import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Self-contained Vitest config. We intentionally do NOT import the default
// export of `./vite.config.ts`: that export's type is a union that includes
// function overloads (UserConfigFn), which breaks `defineConfig` overload
// resolution in the combined `tsconfig.node` program. Replicate the essential
// Vite options here instead.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
