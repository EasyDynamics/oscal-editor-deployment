const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    base_url: 'http://localhost:8080',
  },
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {},
  },
});
