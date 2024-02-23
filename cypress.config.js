const { defineConfig } = require('cypress');

module.exports = defineConfig({
  retries: {
    runMode: 2,
    openMode: 0
  },
  projectId: 'pnbaom',
  // supportFolder: './support',
  e2e: {
    experimentalStudio: true,
    // specPattern: '../apps/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4000',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },

  component: {
    // specPattern: '../packages/**/**.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    }
  }
});
