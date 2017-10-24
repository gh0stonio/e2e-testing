exports.command = function(selector, value) {
  return this.waitForElementVisible(selector, 3000)
    .setValue(selector, value)
    .getValue(selector, function(result) {
      this.assert.equal(result.value, value)
    })
}
