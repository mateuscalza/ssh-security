const pTimeout = require('p-timeout')
const bruteForce = require('./bruteForce')
const delay = require('./delay')
const ssh = require('./ssh')

async function sshBruteForce({
  host = '127.0.0.1',
  username = 'root',
  port = 22,
  verbose = false,
  onFailure = () => undefined,
  errorRetryDelay = 1000,
  timeout = 1500,
  filter = () => true,
}) {
  const operation = async password => {
    try {
      await pTimeout(ssh({
        host,
        username,
        port,
        password,
      }), timeout)
      return true
    } catch (error) {
      if (error.level !== 'client-authentication' && error.constructor !== pTimeout.TimeoutError) {
        if (verbose) {
          console.error(error.message)
        }
        await delay(errorRetryDelay)
        const newAttemptResult = await operation(password)
        return newAttemptResult
      }
    }
    return false
  }

  const result = await bruteForce({
    operation,
    filter,
    onFailure,
  })

  return result
}

module.exports = sshBruteForce
