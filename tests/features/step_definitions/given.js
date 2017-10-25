const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

defineSupportCode(({ Given }) => {
  Given('un utilisateur sur la page de login', () => {
    const loginPage = client.page.login()

    return loginPage.navigate()
  })
})
