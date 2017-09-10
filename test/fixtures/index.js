const fs = require('fs')

module.exports = {
  bad: {
    uri: require.resolve('./bad'),
    text: fs.readFileSync(require.resolve('./bad'), 'utf8')
  },
  good: {
    uri: require.resolve('./good'),
    text: fs.readFileSync(require.resolve('./good'), 'utf8')
  }
}
