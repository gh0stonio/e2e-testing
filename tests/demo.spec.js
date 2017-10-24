module.exports = {
    'Demo test' : function (browser) {
      browser
        .url('http://cucumber.github.io/cucumber-js/')
        .waitForElementVisible('body', 1000)
        .waitForElementVisible('.cucumber-logo', 1000)
        .click('.cucumber-logo')
        .pause(1000)
        .assert.urlEquals('https://cucumber.io/')
        .end();
    }
  };
