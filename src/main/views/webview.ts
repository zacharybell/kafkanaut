import * as vscode from "vscode";

export const createWebview = (context: vscode.ExtensionContext) => (webviewName: string, title: string, ) => {
  const panel = vscode.window.createWebviewPanel(
    webviewName, 
    title,
    vscode.ViewColumn.One,
    {
      enableScripts: true
    }  
  );

  panel.webview.html = generateWebviewHtml(panel.webview, context.extensionUri, webviewName);
};

export const generateWebviewHtml = (webview: vscode.Webview, extensionUri: vscode.Uri, name: string) => {
  const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist/webviews', `${name}.js`));
  const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist/webviews', `${name}.css`));

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <link rel="stylesheet" href="${styleUri}">

      <title>${name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="${scriptUri}"></script>
  </body>
  </html>`;
};