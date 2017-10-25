exports.command = function(selector) {
  return this.waitForElementVisible(selector, 5000)
    .click(selector)
}
