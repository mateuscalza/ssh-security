const numCPUs = require('os').cpus().length
const cluster = require('cluster')

function verticalScaling({ forks = numCPUs, onFork, onMaster, verbose }) {
  if (cluster.isMaster) {
    if (verbose) {
      console.log(`Master ${process.pid} is running`)
    }

    // Fork workers
    const workers = []
    for (let index = 0; index < forks; index++) {
      workers[index] = cluster.fork()
      workers[index].send({ index, forks })
    }

    if (onMaster) {
      onMaster({ cluster, workers, forks })
    }

    cluster.on('exit', (worker, code, signal) => {
      if (verbose || code) {
        console.log(`Worker ${worker.process.pid} died`)
      }
      process.exit(code)
    })
  } else {
    process.on('message', ({ index, forks }) => {
      if (verbose) {
        console.log(`Worker ${process.pid} started (index ${index} of ${forks} forks)`)
      }

      const filter = operationIndex => operationIndex % forks === index
      onFork({ filter, index, forks, cluster })
    })
  }
}

module.exports = verticalScaling
