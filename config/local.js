const seleniumServer = require('selenium-server')
const chromedriver = require('chromedriver')

require('nightwatch-cucumber')({
  cucumberArgs: ['--require', 'tests/features/step_definitions', '--format', 'json:reports/cucumber.json', 'tests/features']
})

module.exports = {
  output_folder: './reports',
  custom_commands_path: ['./tests/utils/commands'],
  custom_assertions_path: [],
  page_objects_path: './tests/pom',
  globals_path: '',
  live_output: true,
  test_workers: {
    enabled: true,
    workers: 5
  },
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': chromedriver.driver
    }
  },

  test_settings: {
    default: {
      launch_url: 'https://secure.fr.vente-privee.com',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: './screenshots'
      },
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  }
}
