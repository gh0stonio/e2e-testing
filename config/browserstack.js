const capabilities = require('/tmp/browserstack_capabilities.json')

require('nightwatch-cucumber')({
  cucumberArgs: ['--require', 'tests/features/step_definitions', '--format', 'json:reports/cucumber.json', 'tests/features']
})

const nightwatch_config = {
  output_folder: false,
  custom_commands_path: ['./tests/utils/commands'],
  custom_assertions_path: [],
  page_objects_path: './tests/pom',
  globals_path: '',
  live_output: true,
  detailed_output: false,
  selenium: {
    start_process: false,
    host: 'hub-cloud.browserstack.com',
    port: 80
  },

  test_settings: {
    default: {},
    ...capabilities
  }
}

// Code to copy seleniumhost/port into test settings
for (var i in nightwatch_config.test_settings) {
  var config = nightwatch_config.test_settings[i]
  config['selenium_host'] = nightwatch_config.selenium.host
  config['selenium_port'] = nightwatch_config.selenium.port
}

module.exports = nightwatch_config
