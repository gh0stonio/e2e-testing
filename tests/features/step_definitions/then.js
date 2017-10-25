const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

defineSupportCode(({ Then }) => {
  Then('je peux voir la home des ventes', () => {
    const homePage = client.page.home()

    return homePage.logoShouldBeVisible()
  })
})