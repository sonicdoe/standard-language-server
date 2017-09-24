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
  },
  semistandard: {
    bad: {
      uri: require.resolve('./semistandard/bad'),
      text: fs.readFileSync(require.resolve('./semistandard/bad'), 'utf8')
    }
  },
  happiness: {
    bad: {
      uri: require.resolve('./happiness/bad'),
      text: fs.readFileSync(require.resolve('./happiness/bad'), 'utf8')
    }
  },
  globals: {
    good: {
      uri: require.resolve('./globals/good'),
      text: fs.readFileSync(require.resolve('./globals/good'), 'utf8')
    }
  },
  ignore: {
    good: {
      uri: require.resolve('./ignore/good'),
      text: fs.readFileSync(require.resolve('./ignore/good'), 'utf8')
    }
  }
}
