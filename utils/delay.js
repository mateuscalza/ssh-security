function delay(delayMs) {
  return new Promise(resolve => setTimeout(resolve, delayMs))
}

module.exports = delay
