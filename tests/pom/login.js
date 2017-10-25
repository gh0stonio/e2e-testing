module.exports = {
  url: function() {
    return this.api.launchUrl + '/ns/fr-fr/login'
  },
  elements: {
    emailInput: '.emailInput',
    passwordInput: '.passwordInput',
    loginButton: '#btSubmit'
  },
  commands: [
    {
      setEmail: function(email) {
        return this.setInputField('@emailInput', email)
      },
      setPassword: function(password) {
        return this.setInputField('@passwordInput', password)
      },
      submit() {
        return this.clickOn('@loginButton')
      }
    }
  ]
}
