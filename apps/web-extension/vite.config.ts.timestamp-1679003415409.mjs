// vite.config.ts
import { defineConfig } from "file:///Users/adamharris/Documents/repos/answersai/sidekick-ai/node_modules/.pnpm/vite@4.1.4/node_modules/vite/dist/node/index.js";
import react from "file:///Users/adamharris/Documents/repos/answersai/sidekick-ai/node_modules/.pnpm/@vitejs+plugin-react@3.1.0_vite@4.1.4/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { crx } from "file:///Users/adamharris/Documents/repos/answersai/sidekick-ai/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.14/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Answers AI",
  version: "1.0.0",
  action: { default_popup: "index.html" },
  host_permissions: ["http://*/*", "https://*/*"],
  permissions: ["tabs", "activeTab", "scripting"],
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/content.tsx"]
    }
  ]
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [react(), crx({ manifest: manifest_default })]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hZGFtaGFycmlzL0RvY3VtZW50cy9yZXBvcy9hbnN3ZXJzYWkvc2lkZWtpY2stYWkvYXBwcy93ZWItZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWRhbWhhcnJpcy9Eb2N1bWVudHMvcmVwb3MvYW5zd2Vyc2FpL3NpZGVraWNrLWFpL2FwcHMvd2ViLWV4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWRhbWhhcnJpcy9Eb2N1bWVudHMvcmVwb3MvYW5zd2Vyc2FpL3NpZGVraWNrLWFpL2FwcHMvd2ViLWV4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbic7XG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5qc29uJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBjcngoeyBtYW5pZmVzdCB9KV1cbn0pO1xuIiwgIntcbiAgXCJtYW5pZmVzdF92ZXJzaW9uXCI6IDMsXG4gIFwibmFtZVwiOiBcIkFuc3dlcnMgQUlcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjBcIixcbiAgXCJhY3Rpb25cIjogeyBcImRlZmF1bHRfcG9wdXBcIjogXCJpbmRleC5odG1sXCIgfSxcbiAgXCJob3N0X3Blcm1pc3Npb25zXCI6IFtcImh0dHA6Ly8qLypcIiwgXCJodHRwczovLyovKlwiXSxcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXCJ0YWJzXCIsIFwiYWN0aXZlVGFiXCIsIFwic2NyaXB0aW5nXCJdLFxuICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXG4gICAge1xuICAgICAgXCJtYXRjaGVzXCI6IFtcImh0dHA6Ly8qLypcIiwgXCJodHRwczovLyovKlwiXSxcbiAgICAgIFwianNcIjogW1wic3JjL2NvbnRlbnQudHN4XCJdXG4gICAgfVxuICBdXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdaLFNBQVMsb0JBQW9CO0FBQzdhLE9BQU8sV0FBVztBQUNsQixTQUFTLFdBQVc7OztBQ0ZwQjtBQUFBLEVBQ0Usa0JBQW9CO0FBQUEsRUFDcEIsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsUUFBVSxFQUFFLGVBQWlCLGFBQWE7QUFBQSxFQUMxQyxrQkFBb0IsQ0FBQyxjQUFjLGFBQWE7QUFBQSxFQUNoRCxhQUFlLENBQUMsUUFBUSxhQUFhLFdBQVc7QUFBQSxFQUNoRCxpQkFBbUI7QUFBQSxJQUNqQjtBQUFBLE1BQ0UsU0FBVyxDQUFDLGNBQWMsYUFBYTtBQUFBLE1BQ3ZDLElBQU0sQ0FBQyxpQkFBaUI7QUFBQSxJQUMxQjtBQUFBLEVBQ0Y7QUFDRjs7O0FEUEEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUUsMkJBQVMsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
