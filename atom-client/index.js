const { AutoLanguageClient } = require('atom-languageclient')

class StandardLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return ['source.js'] }
  getLanguageName () { return 'JavaScript' }
  getServerName () { return 'JavaScript Standard Style' }

  startServerProcess () {
    return super.spawnChildNode([require.resolve('..'), '--stdio'])
  }
}

module.exports = new StandardLanguageClient()
