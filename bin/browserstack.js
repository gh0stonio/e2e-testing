#!/usr/bin/env node

const request = require('superagent-sync')
const path = require('path')
const moment = require('moment')
const { exec, execSync, spawnSync } = require('child_process')
const jsonfile = require('jsonfile')
var ProgressBar = require('progress')
var Chain = require('chain-of-command')

const pkg = require('../package.json')

const nbrLatestVersions = 1
const maxByStack = 1
const targets = {
  Windows: {
    7: ['IE', 'Chrome', 'Firefox'],
    8.1: ['IE', 'Chrome', 'Firefox'],
    10: ['IE', 'Edge', 'Chrome', 'Firefox']
  },
  'OS X': {
    'El Capitan': ['Safari', 'Chrome', 'Firefox'],
    Sierra: ['Safari', 'Chrome', 'Firefox']
  }
}

const generateCapabilities = () => {
  const project = pkg.name
  const build = `${pkg.version}`
  const user = 'antoineleveque2'
  const key = 'F8EfpcvRHh3Rtys3om8j'
  const browserstackCapabilities = []
  const capabilities = {}

  const allResults = request
    .get('https://www.browserstack.com/automate/browsers.json')
    .auth(user, key)
    .set('Accept', 'application/json')
    .end()

  allResults.body.forEach(content => {
    const capabilityName = `${content.os}_${content.os_version}_${content.browser}`.toLowerCase()
    browserstackCapabilities[capabilityName] = browserstackCapabilities[capabilityName] || []

    if (content.browser_version && content.browser_version.indexOf('beta') === -1) {
      browserstackCapabilities[capabilityName].unshift(content.browser_version)
    }
  })

  for (const os in targets) {
    if (targets.hasOwnProperty(os)) {
      for (const osVersion in targets[os]) {
        if (targets[os].hasOwnProperty(osVersion)) {
          targets[os][osVersion].forEach(browserName => {
            const capabilityName = `${os}_${osVersion}_${browserName}`.toLowerCase()

            for (let i = 0; i < nbrLatestVersions; i++) {
              if (browserstackCapabilities[capabilityName] && browserstackCapabilities[capabilityName][i]) {
                const browserVersion = browserstackCapabilities[capabilityName][i]

                let customConf = {}
                if (os === 'OS X' && browserName === 'Safari') {
                  customConf = {
                    'browserstack.safari.allowAllCookies': true,
                    'browserstack.safari.driver': '2.48'
                  }
                }

                capabilities[`${capabilityName.replace(/ /g, '_')}_${browserVersion}`] = {
                  launch_url: 'https://secure.fr.vente-privee.com',
                  detailed_output: false,
                  desiredCapabilities: {
                    project,
                    build,
                    'browserstack.user': user,
                    'browserstack.key': key,
                    'browserstack.debug': true,
                    ...customConf,
                    browser: browserName,
                    browser_version: browserVersion,
                    os,
                    os_version: osVersion,
                    resolution: '1600x1200'
                  }
                }
              }
            }
          })
        }
      }
    }
  }

  jsonfile.writeFileSync('/tmp/browserstack_capabilities.json', capabilities)

  return capabilities
}

let hadError = false
const capabilities = generateCapabilities()
const capabilitiesNames = Object.keys(capabilities)
const verbose = false
const nbrStacks = Math.ceil(capabilitiesNames.length / maxByStack)

console.log(`Start tests for (${capabilitiesNames.length}) browsers`)
const bar = new ProgressBar('[:bar]', { total: nbrStacks + 1, width: 50 })

for (let i = 0; i < nbrStacks; i++) {
  bar.tick(1)
  const start = i * maxByStack
  const stackCapabilities = capabilitiesNames.slice(start, start + maxByStack)
  const cmd = execSync(`nightwatch --config config/browserstack.js --env ${stackCapabilities.join()}`)

  if (cmd.stderr) {
    console.log(cmd.stdout)
    hadError = true
  }

  if (verbose) {
    console.log(cmd.stdout)
  }
}

if (!hadError) {
  console.log('SUCCESS !!!')
}

process.exit(hadError ? 1 : 0)


let arrayOfFunctions = [...];

arrayOfFunctions.reduce((p, fn, index) => {
    return p.then(val => {
        // you may customize what you pass to the next function in the chain
        // and you may accumulate prior results in some other data structure here
        return fn(val);
    });
}, Promise.resolve()).then(result => {
    // all done here
}).catch(err => {
    // error here
});
