const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'pnbaom',
  // supportFolder: './support',
  e2e: {
    // specPattern: '../apps/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
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
