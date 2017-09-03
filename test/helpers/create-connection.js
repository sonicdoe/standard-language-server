import { spawn } from 'child_process'
import * as rpc from 'vscode-jsonrpc'

export default function () {
  const childProcess = spawn('node', [require.resolve('../..'), '--stdio'])

  const connection = rpc.createMessageConnection(
    new rpc.StreamMessageReader(childProcess.stdout),
    new rpc.StreamMessageWriter(childProcess.stdin)
  )

  connection.listen()

  return connection
}
