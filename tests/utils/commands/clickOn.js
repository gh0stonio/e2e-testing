exports.command = function(selector) {
  return this.waitForElementVisible(selector, 3000)
    .click(selector)
}
