require('nightwatch-cucumber')({
    cucumberArgs: ['--require', 'tests/features/step_definitions', '--format', 'json:reports/cucumber.json', 'tests/features']
  })
  
 const nightwatch_config = {
    output_folder: './reports',
    custom_commands_path: [
      './tests/utils/commands'
    ],
    custom_assertions_path: [],
    page_objects_path: './tests/pom',
    globals_path: '',
    selenium : {
      "start_process" : false,
      "host" : "hub-cloud.browserstack.com",
      "port" : 80
    },

    common_capabilities: {
      'browserstack.user': 'antoineleveque2',
      'browserstack.key': 'F8EfpcvRHh3Rtys3om8j',
      'browserstack.debug': true,
      resolution: '1024x768',
      build: 'v0.1',
      project: 'devops-bdd'      
    },
  
    test_settings: {
      default: {},
      ie9: {
        launch_url: 'https://secure.fr.vente-privee.com',
        desiredCapabilities: {
          'os': 'Windows',
          'os_version': '7',
          'browser': 'IE',
          'browser_version': '9.0'
        }
      },
      ie10: {
        launch_url: 'https://secure.fr.vente-privee.com',
        desiredCapabilities: {
          'os': 'Windows',
          'os_version': '7',
          'browser': 'IE',
          'browser_version': '10.0'
        }
      },
      edge16: {
        launch_url: 'https://secure.fr.vente-privee.com',
        desiredCapabilities: {
          'os': 'Windows',
          'os_version': '10',
          'browser': 'Edge',
          'browser_version': '16.0'
        }
      },
      safari10: {
        launch_url: 'https://secure.fr.vente-privee.com',
        desiredCapabilities: {
          'os': 'OS X',
          'os_version': 'Sierra',
          'browser': 'Safari',
          'browser_version': '10.0'
        }
      },
      chrome61: {
        launch_url: 'https://secure.fr.vente-privee.com',
        desiredCapabilities: {
          'os': 'Windows',
          'os_version': '10',
          'browser': 'Chrome',
          'browser_version': '61.0'
        } 
      }
    }
  }
  
// Code to support common capabilites
for(var i in nightwatch_config.test_settings){
  var config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};
  for(var j in nightwatch_config.common_capabilities){
    config['desiredCapabilities'][j] = config['desiredCapabilities'][j] || nightwatch_config.common_capabilities[j];
  }
}

module.exports = nightwatch_config;