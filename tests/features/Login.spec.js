module.exports = {
  after: client => {
    client.end();
  },
  'Basic login': function(client) {
    const loginPage = client.page.login()
    const homePage = client.page.home()

    loginPage.navigate()
      .setEmail('check_vente_fr@vente-privee.com')
      .setPassword('azerty')
      .submit()

    homePage.logoShouldBeVisible()
  }
};
