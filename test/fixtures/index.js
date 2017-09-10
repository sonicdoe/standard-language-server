const fs = require('fs')
const path = require('path')

module.exports = {
  bad: {
    uri: require.resolve('./bad'),
    text: fs.readFileSync(require.resolve('./bad'), 'utf8')
  },
  good: {
    uri: require.resolve('./good'),
    text: fs.readFileSync(require.resolve('./good'), 'utf8')
  },
  standardV9: {
    rootUri: path.join(__dirname, 'standard-v9'),
    good: {
      uri: require.resolve('./standard-v9/good'),
      text: fs.readFileSync(require.resolve('./standard-v9/good'), 'utf8')
    }
  }
}
