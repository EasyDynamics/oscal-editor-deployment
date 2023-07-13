import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    base_url: "http://localhost:8080",
    api_url: "http://localhost:8080/oscal/v1",
  },
  chromeWebSecurity: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  e2e: { setupNodeEvents(on: any, config: any) {} },
  retries: 1,
  video: false,
  defaultCommandTimeout: 60000,
});
