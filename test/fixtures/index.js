const fs = require('fs')

module.exports = {
  bad: {
    uri: require.resolve('../fixtures/bad'),
    text: fs.readFileSync(require.resolve('../fixtures/bad'), 'utf8')
  },
  good: {
    uri: require.resolve('../fixtures/good'),
    text: fs.readFileSync(require.resolve('../fixtures/good'), 'utf8')
  }
}
