'use strict'

const LanguageServer = require('vscode-languageserver')
const importFrom = require('import-from')
const path = require('path')

const connection = LanguageServer.createConnection()
const documents = new LanguageServer.TextDocuments()

documents.listen(connection)

let settings = {
  style: 'standard'
}

let workspaceRoot

connection.onInitialize(params => {
  workspaceRoot = params.rootUri

  return {
    capabilities: {
      textDocumentSync: documents.syncKind
    }
  }
})

connection.onDidChangeConfiguration(change => {
  settings = change.settings.standard
})

documents.onDidChangeContent(change => {
  diagnose(change.document.uri, change.document.getText())
})

function diagnose (uri, text) {
  const engine = getEngine(path.dirname(uri))

  engine.lintText(text, (err, results) => {
    if (err) throw err

    const diagnostics = results.results[0].messages.map(messageToDiagnostic)

    connection.sendDiagnostics({ uri, diagnostics })
  })
}

function getEngine (cwd) {
  try {
    if (workspaceRoot) {
      return importFrom(workspaceRoot, settings.style)
    }

    return importFrom(cwd, settings.style)
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') throw err
  }

  return require(settings.style)
}

function messageToDiagnostic (message) {
  // LSP’s ranges are zero-based while ESLint’s are one-based.
  const line = message.line - 1
  const column = message.column - 1
  const endLine = message.endLine ? message.endLine - 1 : line
  const endColumn = message.endColumn ? message.endColumn - 1 : column

  return {
    range: {
      start: {
        line,
        character: column
      },
      end: {
        line: endLine,
        character: endColumn
      }
    },
    // ESLint uses 2 for errors and 1 for warnings. LSP uses the opposite.
    severity: message.severity === 1 ? 2 : 1,
    code: message.ruleId,
    message: message.message
  }
}

connection.listen()
