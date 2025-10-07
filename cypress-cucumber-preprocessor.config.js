const { defineConfig } = require('@badeball/cypress-cucumber-preprocessor');

module.exports = defineConfig({
  stepDefinitions: 'cypress/support/step_definitions/**/*.js',
  filterSpecs: true,
  omitFiltered: true,
  messages: {
    enabled: true,
    output: 'cypress/cucumber-json/messages.ndjson'
  },
  json: {
    enabled: true,
    output: 'cypress/cucumber-json/results.json',
    formatter: 'cucumber-json-formatter'
  }
});