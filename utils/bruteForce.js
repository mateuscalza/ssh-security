const path = require('path')
const lineByLine = require('n-readlines')

const passwordListFile = path.join(__dirname, '..', 'data', '10-million-password-list-top-1000000.txt')

async function bruteForce({ operation, filter = () => true, onFailure }) {
  const liner = new lineByLine(passwordListFile)

  let index = 0
  while ((line = liner.next())) {
    const password = line.toString().trim()
    if (!filter(password, index)) {
      index++
      continue
    }

    const result = await operation(password, index)
    if (result) {
      return password
    } else if (onFailure) {
      onFailure(password, index)
    }
    index++
  }

  return null
}

module.exports = bruteForce
