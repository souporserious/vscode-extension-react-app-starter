import * as vscode from 'vscode'
import * as path from 'path'

function loadScript(context: vscode.ExtensionContext, path: string) {
  const source = vscode.Uri.file(context.asAbsolutePath(path))
    .with({ scheme: 'vscode-resource' })
    .toString()
  return `<script src="${source}"></script>`
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('react-app.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'react',
        'My React App',
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, 'out')),
          ],
        }
      )
      panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        </head>
        <body>
            <div id="root"></div>
            ${loadScript(context, 'out/vendor.js')}
            ${loadScript(context, 'out/index.js')}
        </body>
        </html>
      `
    })
  )
}

export function deactivate() {}
