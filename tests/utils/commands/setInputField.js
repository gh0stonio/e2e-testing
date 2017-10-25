exports.command = function(selector, value) {
  return this.waitForElementVisible(selector, 5000)
    .clearValue(selector)
    .setValue(selector, value)
    .click(selector)
    .getValue(selector, function(result) {
      this.assert.equal(result.value, value)
    })
}
