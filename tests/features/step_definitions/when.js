const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

defineSupportCode(({ When }) => {
  When('je me log avec le mail {string} et mot de passe {string}', (email, password) => {
    const loginPage = client.page.login()

    return loginPage
      .setEmail(email)
      .setPassword(password)
      .submit()
  })
})
