module.exports = {
  url: function() {
    return this.api.launchUrl + '/ns/fr-fr/home'
  },
  elements: {
    logo: '.VPLogo'
  },
  commands: [
    {
      logoShouldBeVisible: function() {
        return this.waitForElementVisible('@logo', 100)
      }
    }
  ]
}
