const Client = require('ssh2').Client

async function connect({
  host,
  port = 22,
  username = 'root',
  password,
  privateKey,
}) {
  const connection = new Client()

  const attempt = new Promise((resolve, reject) => {
    connection.on('error', reject)
    connection.on('ready', resolve)
  })
  await connection.connect({
    host,
    port,
    username,
    password,
    privateKey,
  })
  await attempt
  return connection
}

module.exports = connect
