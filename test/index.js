import test from 'ava'
import path from 'path'
import fixtures from './fixtures'
import createConnection from './helpers/create-connection'

test.beforeEach(t => {
  t.context.connection = createConnection()
})

test.cb('lints bad.js', t => {
  t.context.connection.sendNotification('textDocument/didOpen', {
    textDocument: fixtures.bad
  })

  t.context.connection.onNotification('textDocument/publishDiagnostics', param => {
    t.deepEqual(param.diagnostics[0], {
      range: {
        start: {
          line: 0,
          character: 13
        },
        end: {
          line: 0,
          character: 13
        }
      },
      severity: 1,
      code: 'semi',
      message: 'Extra semicolon.'
    })

    t.end()
  })
})

test.cb('lints good.js', t => {
  t.context.connection.sendNotification('textDocument/didOpen', {
    textDocument: fixtures.good
  })

  t.context.connection.onNotification('textDocument/publishDiagnostics', param => {
    t.is(param.diagnostics.length, 0)

    t.end()
  })
})

test.cb('prefers standard from workspace', t => {
  t.context.connection.sendRequest('initialize', {
    rootUri: fixtures.standardV9.rootUri
  })

  t.context.connection.sendNotification('textDocument/didOpen', {
    textDocument: fixtures.standardV9.good
  })

  t.context.connection.onNotification('textDocument/publishDiagnostics', param => {
    // If we correctly required standard v9, we should receive no errors.
    t.is(param.diagnostics.length, 0)

    t.end()
  })
})

test.cb('prefers standard relative to text document’s URI', t => {
  t.context.connection.sendNotification('textDocument/didOpen', {
    textDocument: fixtures.standardV9.good
  })

  t.context.connection.onNotification('textDocument/publishDiagnostics', param => {
    // If we correctly required standard v9, we should receive no errors.
    t.is(param.diagnostics.length, 0)

    t.end()
  })
})

test.cb('prefers standard from workspace over text document’s URI', t => {
  t.context.connection.sendRequest('initialize', {
    rootUri: path.join(__dirname, '..')
  })

  t.context.connection.sendNotification('textDocument/didOpen', {
    textDocument: fixtures.standardV9.good
  })

  t.context.connection.onNotification('textDocument/publishDiagnostics', param => {
    // If we correctly required our bundled standard, we should receive one error.
    t.is(param.diagnostics.length, 1)

    t.end()
  })
})

test.cb('supports semistandard', t => {
  t.context.connection.sendNotification('workspace/didChangeConfiguration', {
    settings: {
      standard: {
        style: 'semistandard'
      }
    }
  })

  t.context.connection.sendNotification('textDocument/didOpen', {
    textDocument: fixtures.semistandard.bad
  })

  t.context.connection.onNotification('textDocument/publishDiagnostics', param => {
    t.deepEqual(param.diagnostics[0], {
      range: {
        start: {
          line: 0,
          character: 13
        },
        end: {
          line: 0,
          character: 13
        }
      },
      severity: 1,
      code: 'semi',
      message: 'Missing semicolon.'
    })

    t.end()
  })
})
