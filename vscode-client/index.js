'use strict'

const { LanguageClient, TransportKind } = require('vscode-languageclient')

exports.activate = context => {
  const serverModule = context.asAbsolutePath('..')

  const serverOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: {
        execArgv: ['--nolazy', '--debug=6009']
      }
    }
  }

  const clientOptions = {
    documentSelector: ['javascript']
  }

  const disposable = new LanguageClient(
    'JavaScript Standard Style',
    serverOptions,
    clientOptions
  ).start()

  context.subscriptions.push(disposable)
}
