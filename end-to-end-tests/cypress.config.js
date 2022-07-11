const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    base_url: 'http://localhost:8080',
    api_url: 'http://localhost:8080/oscal/v1',
  },
  defaultCommandTimeout: 15000,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {},
  },

})
