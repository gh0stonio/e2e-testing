require('nightwatch-cucumber')({
  cucumberArgs: ['--require', 'tests/features/step_definitions', '--format', 'json:reports/cucumber.json', 'tests/features']
})

module.exports = {
  output_folder: './reports',
  custom_commands_path: [
    './tests/utils/commands'
  ],
  custom_assertions_path: [],
  page_objects_path: './tests/pom',
  globals_path: '',
  test_workers: {
    enabled: true,
    workers: 2
  },
  selenium: {
    start_process: true,
    server_path: './bin/selenium-server-standalone-3.6.0.jar',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': './bin/drivers/chromedriver'
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
