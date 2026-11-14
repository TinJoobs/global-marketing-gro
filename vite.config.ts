import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Read optional extra allowed hosts from the environment at config load.
const extraHosts = (process.env.GMG_ALLOWED_HOSTS ?? "")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);
for (const host of extraHosts) {
  if (!/^\.?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(host)) {
    throw new Error(`Invalid hostname in GMG_ALLOWED_HOSTS: ${host}`);
  }
}
const allowedHosts = [".modal.host", ...extraHosts];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: { host: "0.0.0.0", port: 8080, strictPort: true, allowedHosts },
  preview: { host: "0.0.0.0", port: 8080, strictPort: true, allowedHosts },
  build: { outDir: "dist" },
});
