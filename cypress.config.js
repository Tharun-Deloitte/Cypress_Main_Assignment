const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{

    URL:'https://magento.softwaretestingboard.com/',

    EMAIL_ID: 'tharunnara46135@gmail.com',

    PASSWORD:'N@R@04062001'

  },
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    defaultCommandTimeout: 30000,
    retries: {
      runMode: 8,
      openMode: 8,
      },
    
  },
});
